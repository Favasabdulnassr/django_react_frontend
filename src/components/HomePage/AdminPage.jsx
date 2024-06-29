import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers } from '../../features/AdminSlice';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../features/AdminSlice';
import { userLogout } from '../../features/Loginslice';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector(state => state.admin);
  const {user,is_Authenticated} = useSelector((state)=>state.login)
  
  const navigate = useNavigate()

  // Component state for local edits
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ id: null, first_name: '', last_name: '', email: '' });
  
  
  useEffect(()=>{
    console.log('sshshshshshscndhiosfho',users)
  })
  useEffect(()=>{
    if (is_Authenticated && user.isSuperuser){
      navigate("/admin")
    }else{
      navigate("/")
    }
  },[is_Authenticated])

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


 


  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));  
  };

  const saveEdit = () => {
    dispatch(updateUser({ userId: formData.id, userData: formData })); // Dispatch updateUser action with userId and formData
    setEditingUser(null);
    setFormData({ id: null, first_name: '', last_name: '', email: '' });
  };

  const filteredUsers = users.filter(user => 
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDeleteUser = (userId) => {
    dispatch(deleteUser({ userId }))
      .then(() => {
        window.location.reload() 

      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      });
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={() =>{dispatch(userLogout())}}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
        <div className="mb-4">
          <input 
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <h2 className="text-xl font-semibold mb-3">User List</h2>
        <ul className="divide-y divide-gray-200">
          {filteredUsers.map(user => (
            <li key={user.id} className="py-4 flex justify-between items-center">
              {editingUser === user.id ? (
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <button 
                    onClick={saveEdit} 
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div>
                   
                    <div className="text-lg font-medium text-gray-900">{user?.first_name} {user?.last_name}</div>
                    <div className="text-gray-500">{user?.email}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(user)} 
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                   
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
