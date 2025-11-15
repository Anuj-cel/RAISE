import jwt from "jsonwebtoken";

export const authoriseUser = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = header.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    // decoded should have 'id' and 'role' because you signed the token with these fields
    const { id, role,staffId,registrationId } = decoded;

    // You can add role check here if needed, e.g. allow only student/admin
    if (role !== "student" && role !== "admin") {
      return res.status(403).json({ message: "Access denied: invalid role" });
    }

    // Attach user info to request object
    req.user = { id, role,staffId,registrationId };

    next(); // proceed to next middleware or route handler

  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};
