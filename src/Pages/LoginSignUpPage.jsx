import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

  useEffect(() => {
    const newErrors = {};

    // Identifier: Email or Mobile
    if (identifier && !emailRegex.test(identifier) && !mobileRegex.test(identifier)) {
      newErrors.identifier = 'Enter a valid email or 10-digit mobile number.';
    }

    // Signup-only validations
    if (!isLogin) {
      if (!name.trim()) newErrors.name = 'Name is required.';
      if (!mobileRegex.test(mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number.';
      if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Password validation
    if (password && !passwordRegex.test(password)) {
      newErrors.password = 'Must be 8+ chars, 1 uppercase, 1 symbol, and 1 number.';
    }

    setErrors(newErrors);
  }, [identifier, name, mobile, password, confirmPassword, isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && identifier && password) {
      alert(isLogin ? 'Logging in...' : 'Signing up...');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-4xl shadow-lg overflow-hidden max-w-5xl w-full">

        {/* Left Side Image */}
        <div className="md:w-2/5 w-full bg-stone-800 flex justify-center items-center p-4">
          <img src="./images/img1.jpg" alt="house" className="rounded-lg w-full h-auto object-cover" />
        </div>

        {/* Right Side Form (Updated to take 60%) */}
        <div className="md:w-3/5 w-full p-6 sm:p-8 space-y-6 rounded-4xl">
          <h2 className="text-2xl font-semibold text-center">
            {isLogin ? 'Already have an account?' : 'Create Your Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.name ? 'border-red-500' : 'focus:border-blue-500'}`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
            )}

            {/* Email or Mobile */}
            <div>
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter email or mobile"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.identifier ? 'border-red-500' : 'focus:border-blue-500'}`}
              />
              {errors.identifier && <p className="text-red-500 text-sm">{errors.identifier}</p>}
            </div>

            {/* Mobile (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="text"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.mobile ? 'border-red-500' : 'focus:border-blue-500'}`}
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none pr-10 ${errors.password ? 'border-red-500' : 'focus:border-blue-500'}`}
              />
              <span
                className="absolute top-9 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirm Password (Signup only) */}
            {!isLogin && (
              <div className="relative">
                <label className="block text-gray-700 mb-1">Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none pr-10 ${errors.confirmPassword ? 'border-red-500' : 'focus:border-blue-500'}`}
                />
                <span
                  className="absolute top-9 right-3 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Login options */}
            {isLogin && (
              <div className="flex justify-between text-sm text-gray-600">
                <label>
                  <input type="checkbox" className="mr-1 cursor-pointer" />
                  Remember me
                </label>
                <a href="#" className="hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || !identifier || !password}
              className={`w-full py-2 font-semibold rounded-lg text-white transition cursor-pointer ${Object.keys(errors).length > 0 || !identifier || !password
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-green-400 hover:opacity-90'
                }`}
            >
              {isLogin ? 'LOGIN' : 'SIGN UP'}
            </button>
          </form>

          {/* Toggle AuthO Mode */}
          <div className="text-sm text-center">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button className="text-blue-500 hover:underline cursor-pointer" onClick={() => setIsLogin(false)}>
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button className="text-blue-500 hover:underline cursor-pointer" onClick={() => setIsLogin(true)}>
                  Login
                </button>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <span className="border-t w-1/4"></span>
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <span className="border-t w-1/4"></span>
          </div>

          {/* AuthO */}
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-3 px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>

            <button className="flex items-center justify-center gap-3 px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
              <FaApple className="text-xl" />
              Sign in with Apple ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
