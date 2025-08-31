import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout"
import Login from './components/Login'
import Signup from './components/Signup'
import ForgetPassword from './components/ForgetPassword'
import About from './components/About'
import Contact from './components/Contact'

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Layout wraps all these routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
        </Routes>
      </Router>


    </>
  )
}

export default App
