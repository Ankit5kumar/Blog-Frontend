import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
const URL = process.env.REACT_APP_API_BASE_URL;
function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/login`, form);
      console.log("response",res)
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('profileimage', res.data.user.profileImage)
      localStorage.setItem('userid', res.data.user._id)
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
  
    
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
  <div>
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input
      type="email"
      name="email"
      id="email"
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="name@company.com"
      required
      value={form.email}
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="••••••••"
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required
      value={form.password}
      onChange={handleChange}
    />
  </div>
  <button type="submit" className="w-full border-1 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
    Sign in
  </button>
  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
    Don't have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
  </p>
</form>
            </div>
          </div>
        </div>
      </section>
  
  );
}

export default LoginForm;
