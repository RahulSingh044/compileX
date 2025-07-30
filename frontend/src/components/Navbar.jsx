import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  FaCode,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaPlay,
  FaBook,
  FaUsers,
  FaGithub
} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlicer'
import { toast } from 'react-toastify'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(user.isAuthenticated);
  const location = useLocation()

  const logoutUser = () => {
    dispatch(logout())
    toast.success('Logout Successfully')
    navigate('/')
  }

  const navigation = [
    { name: 'Home', href: '/', icon: FaCode },
    { name: 'Playground', href: '/playground', icon: FaPlay },
    { name: 'Documentation', href: '/docs', icon: FaBook },
    { name: 'Community', href: '/community', icon: FaUsers },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <FaCode className="h-8 w-8 text-blue-500" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-white">compilerX</h1>
                <p className="text-xs text-gray-400">Online IDE</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right side - GitHub, User Menu */}
          <div className="hidden md:flex items-center space-x-4">

            {/* GitHub Link */}
            <a
              href={`https://github.com/${user?.user?.username || ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              <FaGithub className="h-5 w-5" />
            </a>

            {/* Login/Signup Buttons */}
            {!isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <FaUser className="h-5 w-5" />
                  <span className="hidden lg:block">{user.name || user.user.username}</span>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-700">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    >
                      <FaUser className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    >
                      <FaCog className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <hr className="border-gray-700 my-1" />
                    <button
                      onClick={() => {
                        logoutUser()
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-200"
                    >
                      <FaSignOutAlt className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile User Menu */}
          <div className="px-4 py-3 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaUser className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">John Doe</span>
              </div>
              <button
                onClick={() => {
                  // Handle logout
                  console.log('Logout clicked')
                }}
                className="text-red-400 hover:text-red-300"
              >
                <FaSignOutAlt className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Auth Buttons */}
          {user && (
            <div className="px-4 py-3 border-t border-gray-700 space-y-2">
              <Link
                to="/login"
                className="block w-full px-4 py-2 text-center text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}

        </div>
      )}
    </nav>
  )
}

export default Navbar 