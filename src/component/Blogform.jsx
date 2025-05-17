import React, { useState } from 'react';
import axios from '../api/axiosInstance';

const Blogform = ({ setShowModal,onBlogCreated }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    if (form.image) data.append('image', form.image);
const token = localStorage.getItem("token");

    try {
      await axios.post('http://localhost:3005/blog', data , 
        {
        headers: {
            Authorization:`Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
      );
      alert('Blog created successfully!');
      setShowModal(false);

      if (onBlogCreated) onBlogCreated();
    } catch (err) {
      alert('Failed to create blog');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h2 className="text-xl font-bold mb-4">Create Blog</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              className="w-full mb-3 p-2 border rounded"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Blog Description"
              className="w-full mb-3 p-2 border rounded"
              rows={4}
              value={form.description}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full mb-3"
              onChange={handleChange}
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blogform;