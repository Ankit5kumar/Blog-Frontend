import React, { useState } from 'react'
import Blogform from './Blogform'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const profileimage = localStorage.getItem("profileimage");
   
     const imageUrl = profileimage
      ? `http://localhost:3005/uploads/${profileimage}`
    : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?...'; 

      const navigate = useNavigate();
const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileimage");
    localStorage.removeItem("userid");
    navigate("/");
};

  return (
 <>
     <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div>
              <h1 className="text-white">Dashboards</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => logout()}
              >
                logout
              </button>
              <button
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img
                  className="size-8 rounded-full"
                  src={imageUrl}
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {showModal && <Blogform setShowModal={setShowModal} />}
 </>
  )
}

export default Navbar
