import React, { useState } from 'react';
import axios from '../api/axiosInstance';
const URL = process.env.REACT_APP_API_BASE_URL;
const BlogCard = ({ blog, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    title: blog.title || '',
    description: blog.description || '',
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

   const currentImageUrl = blog.image
    ? `${URL}/uploads/${blog.image}`
    : 'https://via.placeholder.com/150';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    if (form.image) data.append('image', form.image);

    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `${URL}/blogupdate/${blog._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Blog updated successfully!');
      if (onUpdate) onUpdate();
      if (onClose) onClose();
    } catch (err) {
      alert('Failed to update blog');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
        <img
          src={currentImageUrl}
          alt={form.title || 'Blog image'}
          className="h-32 w-full object-cover rounded mb-4"
        />
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
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogCard;