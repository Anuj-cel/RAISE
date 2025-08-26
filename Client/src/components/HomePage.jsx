import React from 'react'

export default function HomePage() {
  return (
    <div>
        {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-4xl font-bold mb-4">Welcome to My Hostel</h2>
        <p className="mb-6">A simple homepage built with React & Tailwind CSS.</p>
        <a
          href="/"
          className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto py-16 px-6">
        <h3 className="text-2xl font-semibold text-center mb-8">About Us</h3>
        <p className="text-center text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sit magni quidem deleniti,
           deserunt, harum quis ab error, rerum accusamus voluptas. Iste nemo doloremque ipsam nulla,
            vitae aspernatur odit reprehenderit?
        </p>
      </section>
    </div>
  )
}
