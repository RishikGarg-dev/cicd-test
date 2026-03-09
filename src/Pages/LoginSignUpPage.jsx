import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginSignup = () => {
  // Changed initial state to 'login'
  const [authState, setAuthState] = useState('login');
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

  useEffect(() => {
    const newErrors = {};
    if (identifier && !emailRegex.test(identifier) && !mobileRegex.test(identifier)) {
      newErrors.identifier = 'Enter a valid email or 10-digit mobile number.';
    }
    if (password && !passwordRegex.test(password)) {
      newErrors.password = 'Must be 8+ chars, 1 uppercase, 1 symbol, and 1 number.';
    }

    if (authState === 'signup') {
      if (!name.trim()) newErrors.name = 'Name is required.';
      if (!mobileRegex.test(mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number.';
      if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
  }, [identifier, name, mobile, password, confirmPassword, authState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && identifier && password) {
      alert(authState === 'login' ? 'Welcome back to Shiftly!' : 'Welcome to  Shiftly ');
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 overflow-hidden" 
         style={{ minHeight: 'calc(100vh - 80px)' }}>
      
      <div className="relative flex flex-col md:flex-row w-full max-w-4xl min-h-[550px] bg-white 
                      md:rounded-[30px] shadow-2xl overflow-hidden md:mx-4 border border-gray-100">

        {/* Left Side Image */}
        <div className="relative hidden md:block w-1/2 self-stretch">
          <img src="./images/img1.jpg" alt="Shiftly Homes" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 text-white z-10">
            <h1 className="text-4xl font-bold">Shiftly</h1>
            <p className="text-lg opacity-90"></p>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-white h-auto">
          
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
               {authState === 'login' ? 'Sign In ' : 'Sign Up'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
               {authState === 'login' 
                ? "" 
                : ""}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authState === 'signup' && (
              <div>
                <label className="block text-gray-700 text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-transparent border-b py-2 outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-gray-900'}`}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-gray-700 text-sm mb-1">Username or Email</label>
              <input
                type="text"
                placeholder="Enter email or mobile"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className={`w-full bg-transparent border-b py-2 outline-none transition-all ${errors.identifier ? 'border-red-500' : 'border-gray-300 focus:border-gray-900'}`}
              />
              {errors.identifier && <p className="text-red-500 text-xs">{errors.identifier}</p>}
            </div>

            {authState === 'signup' && (
              <div>
                <label className="block text-sm text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="text"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={`w-full bg-transparent border-b py-2 outline-none transition ${errors.mobile ? 'border-red-500' : 'border-gray-300 focus:border-gray-900'}`}
                />
                {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
              </div>
            )}

            <div className="relative">
              <label className="block text-gray-700 text-sm mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-transparent border-b py-2 outline-none transition ${errors.password ? 'border-red-500' : 'border-gray-300 focus:border-gray-900'}`}
              />
              <span className="absolute top-8 right-2 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            {authState === 'signup' && (
              <div className="relative">
                <label className="block text-gray-700 text-sm mb-1">Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full bg-transparent border-b py-2 outline-none transition ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-gray-900'}`}
                />
                <span className="absolute top-8 right-2 cursor-pointer text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || !identifier || !password}
              className={`w-full py-3 mt-4 font-medium rounded-xl text-white transition ${Object.keys(errors).length > 0 || !identifier || !password ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'}`}
            >
              {authState === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="text-sm text-center mt-6">
            {authState === 'login' ? (
              <>
                New to Shiftly?{' '}
                <button className="text-blue-500 font-semibold hover:underline" onClick={() => setAuthState('signup')}>
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button className="text-blue-500 font-semibold hover:underline" onClick={() => setAuthState('login')}>
                  Sign in
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-center my-6">
            <span className="border-t border-gray-300 w-1/4"></span>
            <span className="mx-2 text-gray-400 text-xs uppercase tracking-wider">or continue with</span>
            <span className="border-t border-gray-300 w-1/4"></span>
          </div>

          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-xl transition hover:bg-gray-50 active:scale-[0.98]">
              <FcGoogle className="text-xl" /> Sign in with Google
            </button>
            <button className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-xl transition hover:bg-gray-50 active:scale-[0.98]">
              <FaApple className="text-xl" /> Sign in with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;