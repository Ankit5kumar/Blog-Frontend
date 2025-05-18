import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
const URL = process.env.REACT_APP_API_BASE_URL;
function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
const userId = localStorage.getItem('userid');

  const fetchData = async () => {
    try {
      const res = await axios.get(`${URL}/blog/${userId}`);
    
      setBlogs(res.data);

      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      }
    } catch (err) {
      console.error(err);
    }
  };
console.log("blogs",blogs)
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '75%' }}>
        <h2>All Blogs</h2>
        <Link to="/blogs/new">+ Add New Blog</Link>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>
                  <img src={`${URL}/uploads/${blog.image}`} alt="image" width={50} />
                </td>
                <td>{blog.description.slice(0, 50)}...</td>
                <td>
                  <Link to={`/blogs/${blog._id}`}>View</Link> |{' '}
                  {user && blog.author._id === user.userId && (
                    <>
                      <Link to={`/blogs/edit/${blog._id}`}>Edit</Link> |{' '}
                      <button
                        onClick={async () => {
                          if (window.confirm('Are you sure?')) {
                            await axios.delete(`/blogs/${blog._id}`);
                            fetchData();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ width: '20%', textAlign: 'right' }}>
        <h3>Welcome</h3>
        {user && (
          <>
            <img
              src={`http://localhost:5000/uploads/${user.profileImage}`}
              alt="Profile"
              width={80}
              height={80}
              style={{ borderRadius: '50%' }}
            />
            <p>{user.email}</p>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
