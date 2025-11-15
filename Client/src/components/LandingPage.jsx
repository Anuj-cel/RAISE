import { Home, FileText, CheckCircle, Bell, Shield, Zap } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Hostel Grievance Portal
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition">How It Works</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition">About</a>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Zap className="w-4 h-4" />
              <span>AI-Powered Grievance Management</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Voice,
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              A modern, transparent platform for hostel students to submit and track grievances.
              Powered by AI for faster resolution and better communication.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg">
                Submit Grievance
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition shadow-md border-2 border-gray-200 font-semibold text-lg">
                Track Status
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Grievances Resolved</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">24h</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Mess Quality Issue</div>
                  <div className="text-sm text-gray-600 mt-1">Auto-categorized as: Food & Mess</div>
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                      In Progress
                    </div>
                    <div className="text-xs text-gray-500">Assigned to Staff</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">WiFi Connectivity Problem</div>
                  <div className="text-sm text-gray-600 mt-1">Auto-categorized as: Maintenance</div>
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      Resolved
                    </div>
                    <div className="text-xs text-gray-500">Completed in 18h</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Power Outage in Block A</div>
                  <div className="text-sm text-gray-600 mt-1">Auto-categorized as: Urgent</div>
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                      High Priority
                    </div>
                    <div className="text-xs text-gray-500">Detected by AI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Better Management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-enhanced tools to make grievance handling faster, smarter, and more transparent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition border border-blue-100">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Auto-Categorization</h3>
              <p className="text-gray-600 leading-relaxed">
                Machine learning automatically categorizes grievances into maintenance, mess, security,
                and other categories for faster routing.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition border border-green-100">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Track your grievance status in real-time from submission to resolution.
                Get instant updates via email and SMS notifications.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition border border-purple-100">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Prioritization</h3>
              <p className="text-gray-600 leading-relaxed">
                AI detects urgent issues like power outages and security concerns,
                automatically flagging them for immediate attention.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 hover:shadow-xl transition border border-orange-100">
              <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Duplicate Detection</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced algorithms identify similar or duplicate complaints,
                helping admins resolve common issues more efficiently.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition border border-teal-100">
              <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure & Anonymous</h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is protected with JWT authentication. Option to submit grievances
                anonymously for sensitive issues.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 hover:shadow-xl transition border border-yellow-100">
              <div className="w-14 h-14 bg-yellow-600 rounded-xl flex items-center justify-center mb-6">
                <Home className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive dashboard for admins to assign, monitor, and analyze
                grievances with detailed analytics and reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, transparent process from submission to resolution
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Submit Grievance</h3>
              <p className="text-gray-600">
                Describe your issue with text and images through our easy-to-use form
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Processing</h3>
              <p className="text-gray-600">
                Our AI automatically categorizes, prioritizes, and detects duplicates
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Assignment</h3>
              <p className="text-gray-600">
                Admin assigns to appropriate staff member based on category and priority
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Resolution</h3>
              <p className="text-gray-600">
                Track progress in real-time and receive notifications when resolved
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Built by Students, For Students
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Developed as part of a MERN stack project with AI integration, this platform aims to
            revolutionize hostel management by providing transparency, efficiency, and faster resolution
            times for student grievances.
          </p>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-3 rounded-full">
            <span className="text-gray-700 font-medium">Powered by</span>
            <span className="font-bold text-gray-900">React • Node.js • MongoDB • OpenAI</span>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">Hostel Grievance Portal</span>
              </div>
              <p className="text-gray-400 mb-4">
                Making hostel life better through transparent and efficient grievance management.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@hostelportal.com</li>
                <li>+91 XXX XXX XXXX</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Hostel Grievance Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
