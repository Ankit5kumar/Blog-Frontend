import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import BlogCard from './BlogCard';
import Blogform from './Blogform';

const Table = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
const [viewBlog, setViewBlog] = useState(null);
const [showViewModal, setShowViewModal] = useState(false);
  const userId = localStorage.getItem('userid');

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/blog/${userId}`);
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (blogId) => {
  try {
    await axios.delete(`http://localhost:3005/blogdelete/${blogId}`);
    fetchData();
  } catch (err) {
    alert('Failed to delete blog');
    console.error(err);
  }
};



  useEffect(() => {
    fetchData();
  }, []);
  const handleView = (blog) => {
  setViewBlog(blog);
  setShowViewModal(true);
};

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
  };

  return (
    <div className="relative overflow-x-auto mt-2">
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setShowCreateModal(true)}
      >
        Create Blog
      </button>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4">
                <img
                  className="h-20 rounded-lg shadow-xl dark:shadow-gray-800"
                  src={blog.image ? `http://localhost:3005/uploads/${blog.image}` : 'https://via.placeholder.com/150'}
                  alt={blog.title || 'Blog image'}
                />
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {blog.title}
              </th>
              <td className="px-6 py-4">{blog.description
    .split('.')
    .slice(0, 3)
    .join('.') + (blog.description.split('.').length > 3 ? '...' : '')}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg"
                  onClick={() => handleView(blog)}
                  >
                    View
                  </button>
                  <button
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg"
                  onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create Blog Modal */}
      {showCreateModal && (
        <Blogform
          setShowModal={setShowCreateModal}
          onBlogCreated={fetchData}
        />
      )}

      {/* Edit Blog Modal */}
      {showEditModal && selectedBlog && (
        <BlogCard
          blog={selectedBlog}
          onClose={() => setShowEditModal(false)}
          onUpdate={fetchData}
        />
      )}

      {showViewModal && viewBlog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">{viewBlog.title}</h2>
      <img
        src={viewBlog.image ? `http://localhost:3005/uploads/${viewBlog.image}` : 'https://via.placeholder.com/150'}
        alt={viewBlog.title || 'Blog image'}
        className="h-40 w-full object-cover rounded mb-4"
      />
      <p className="mb-4 whitespace-pre-line">{viewBlog.description}</p>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setShowViewModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Table;