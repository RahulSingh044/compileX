import React from 'react'
import { Link } from 'react-router-dom'
import { FaCode, FaPlay, FaBook, FaUsers, FaRocket, FaLightbulb } from 'react-icons/fa'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Code, Compile, 
            <span className="text-blue-400"> Execute</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The ultimate online compiler and IDE. Write, run, and share code in multiple programming languages with real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/playground"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <FaPlay className="mr-2" />
              Start Coding
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200"
            >
              <FaBook className="mr-2" />
              Documentation
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div className="text-blue-400 mb-4">
              <FaCode className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Multiple Languages</h3>
            <p className="text-gray-300">
              Support for Python, JavaScript, Java, C++, and many more programming languages.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div className="text-blue-400 mb-4">
              <FaRocket className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Fast Execution</h3>
            <p className="text-gray-300">
              Lightning-fast code compilation and execution with real-time output.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div className="text-blue-400 mb-4">
              <FaUsers className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Collaboration</h3>
            <p className="text-gray-300">
              Share your code with others and collaborate in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start coding?
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of developers who trust our platform for their coding needs.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <FaLightbulb className="mr-2" />
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home