import User from "../models/userModel.js";
import { ApiError } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import {sendEmail} from '../utils/sendEmail.js'

// /api/users/verify          POST
// /api/users/register        GET
// /api/users/login           POST
// /api/users/refresh-token   POST
// /api/users/logout          POST
// /api/users/change-password	PUT	    Allows the user to change their password.
// /api/users/reset-password	POST	  Sends a password reset link to the user's email.

export async function verifyRegistration(req, res) {
  try {
    const { name, registrationNo, password } = req.body;
    const role="admin"; // default for now

    // 1. check all the fields are valid
    if (
      [name, registrationNo, password].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fileds are required.");
    }
    //2. make email
    const email=registrationNo+"@nitjsr.ac.in";

    // 3. check if user with email already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(400, "User with email already exists.");
    }
    // user verification via mail
      const token = jwt.sign(
      { name, email, password, role },
      process.env.JWT_SECRETKEY,
      {
        expiresIn: "5m",
      }
    );

    if (!token) throw new ApiError(400, "Token could not be created.");

    const link = `http://localhost:8080/api/verify?token=${token}`;
    await sendEmail({to: email, subject:"Verify your account", 
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #333; text-align: center;">Verify Your Email Address</h2>
            <p style="color: #555; line-height: 1.6;">Hello,</p>
            <p style="color: #555; line-height: 1.6;">Thank you for registering with us! To complete your registration and activate your account, please click the button below to verify your email address:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${link}" style="background-color: #007bff; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Email</a>
            </div>
            <p style="color: #470000; line-height: 1.6;">This link will expire in 5 minutes.</p>
            <p style="color: #555; line-height: 1.6;">If you didn't create an account with us, please ignore this email.</p>
            <p style="color: #555; line-height: 1.6; margin-top: 30px;">Trouble with the button? Use this link:</p>
            <p style="color: #007bff; word-break: break-all;"><a href="${link}" style="color: #007bff; text-decoration: none;">${link}</a></p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
            <p style="color: #888; font-size: 12px; text-align: center;">© 2025 HostelApp • Please don’t reply • All rights reserved</p>
        </div>`}
    );

    res.status(201).json({success:true, message: "Verification email sent" });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function registerUser(req, res) {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const avatar = decoded.name[0].toUpperCase();

    // create new user
    const newUser = await User.create({
      name: decoded.name,
      email: decoded.email,
      password: decoded.password,
      role: decoded.rrole,
      avatar,
    });

    const accessToken = await generateAccessToken(newUser._id);
    const refreshToken = await generateRefreshToken(newUser._id);

    if (!accessToken || !refreshToken) {
      await User.findByIdAndDelete(newUser._id);
      throw new ApiError(500, "RefreshToken or AccessToken could not be generated.");
    }

    newUser.refreshToken = refreshToken;

    await newUser.save();

    return res.status(201)
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true, // ✅ required in production (HTTPS)
        sameSite: "None", // ✅ needed for cross-site cookies
      })
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        secure: true, // ✅ required in production (HTTPS)
        sameSite: "None", // ✅ needed for cross-site cookies
      })
      .json({
        success: true,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
        },
      });
  
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    // 1. check all the fields are valid
    if ([email, password].some((field) => !field || field.trim() === "")) {
      throw new ApiError(400, "All fileds are required.");
    }

    // 2. user with email exists
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(401, "Invalid credentials.");

    // 3. password entered is correct
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid credentials.");

    // 4. generate access and refresh token
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    if (!accessToken || !refreshToken) {
      throw new ApiError(500,"RefreshToken or AccessToken could not be generated.");
    }

    // 5. store the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // 6. send response with cookies
    return res.status(200)
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true, // ✅ required in production (HTTPS)
        sameSite: "None", // ✅ needed for cross-site cookies
        maxAge: 1000 * 60 * 15, // 15 minutes (example)
      })
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true, // ✅ required in production (HTTPS)
        sameSite: "None", // ✅ needed for cross-site cookies
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function refreshTokenHandler(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const incomingRefreshToken = req.cookies?.refresh_token || (
        authHeader &&
        authHeader.startsWith("Bearer") &&
        authHeader.split(" ")[1])
      ;

    // 1. check if refreshToken is present
    if (!incomingRefreshToken) throw new ApiError(400, "Token is required.");

    // 2. decode the incoming refresh token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // 3. get the user with refresh token
    const user = await User.findById(decodedToken.id);
    if (!user) throw new ApiError(400, "Invalid token or user not found.");

    if (incomingRefreshToken !== user.refreshToken)
      throw new ApiError(400, "Invalid token");

    // 4. generate new access and refresh token
    const newAccessToken = await generateAccessToken(user._id);
    const newRefreshToken = await generateRefreshToken(user._id);

    // 5. update the new refresh token in the user
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    // 6. return response and cookie
    return res
      .status(200)
      .cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true, // ✅ required in production (HTTPS)
        sameSite: "None",
      })
      .cookie("access_token", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        secure: true, // ✅ required in production (HTTPS)
        sameSite: "None",
      })
      .json({
        success: true,
        newRefreshToken,
        newAccessToken,
      });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function logoutUser(req, res) {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { refreshToken: undefined },
      },
      {
        new: true,
      }
    );

    return res.status(200)
      .clearCookie("access_token", {
        httpOnly: true,
        secure: true, // ✅ required in production (HTTPS)
        sameSite: "None",
      })
      .clearCookie("refresh_token", {
        httpOnly: true,
        secure: true, // ✅ required in production (HTTPS)
        sameSite: "None",
      })
      .json({
        success: true,
        message: "User logged out successfully.",
      });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

