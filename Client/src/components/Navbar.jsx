import React from 'react'

export default function Navbar() {
    return (
        <div>
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">MyHostel</h1>

                {/* Links */}
                <ul className="flex space-x-6 items-center justify-center">
                    <li>
                        <a href="/" className="hover:text-blue-500">Home</a>
                    </li>
                    <li>
                        <a href="/about" className="hover:text-blue-500">About</a>
                    </li>
                    <li>
                        <a href="/contact" className="hover:text-blue-500">Contact</a>
                    </li>
                    <li>
                        <a href="/login">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Login
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="/signup">
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                Signup
                            </button>
                        </a>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
