import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserProfile } from '../features/userProfileSlice'
import { updateUserProfile } from '../features/userProfileSlice'

function Profile() {

    const [editMode,setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
      });

    const user = useSelector((state)=>state.userProfile.user)
    const is_Authenticated = useSelector((state)=>state.login.is_Authenticated)
    const navigate = useNavigate()


    const dispatch = useDispatch(); // Get dispatch function from Redux

    useEffect(() => {
        if (!is_Authenticated) {
          navigate('/');
        } else {
            console.log('userprofile fetch calll...............................')
          dispatch(fetchUserProfile());
        }
      }, [is_Authenticated, dispatch, navigate]);
    
    
    useEffect(() => {
    if (user) {
        console.log('User profile:', user);
        setFormData({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        });
    }
    }, [user]);
    

    useEffect(()=>{
        if (user){
            console.log(user);
        }
        
    })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleEditProfile = () => {
        setEditMode(true);
      };
    
      const handleSaveProfile = () => {
        setEditMode(false);
        // Dispatch action to update user profile with formData
        dispatch(updateUserProfile(formData));
      };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8'>
        <div className='max-w-md w-full  shadow-md rounded-lg p-6'>
            <div className='flex items-center justify-center'>
                <label htmlFor='profile-image' className=' cursor-pointer'>
                    <img
                    src='/placeholder.png'
                    alt='profile'
                    className='bg-green-700 h-32 w-32 rounded-full object-cover'
                    />

                    <input
                    type='file'
                    id='profile-image'
                    accept='image/*'
                    className='hidden'
                    
                    />
                </label>

            </div>


            <div className='bg-green-900-500 mt-6'>
                <div className=''>
                    <label htmlFor='first_name' className='block text-sm font-medium text-gray-700'>
                        First Name
                    </label>
                    <div className='mt-1'>

                        {editMode ? (

                            <input

                            type="text"
                            id="first-name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                            
                            />
                        ):(
                            <span className="text-sm text-gray-900">{user?user.first_name:""}</span>

                        )}

                    </div>

                    <div className='mb-4'>
                        <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                            Last Name

                        </label>

                        <div className='mt-1'>
                            {editMode? (
                                <input
                                type='text'
                                id='last-name'
                                name='last-name'
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"

                                />


                            ):
                            (
                                <span className="text-sm text-gray-900">{user?user.last_name:""}</span>

                            )
                            
                            }

                        </div>

                    </div>

                    <div className='mb-4'>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <div className="mt-1">
                            {editMode ? (
                                <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                />
                            ) : (
                                <span className="text-sm text-gray-900">{user?user.email:""}</span>
                            )}
                       </div>

                    </div>
                     {editMode ? (
                            <button
                            type="button"
                            onClick={handleSaveProfile}
                            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            Save
                            </button>
                        ) : (
                            <button
                            type="button"
                            onClick={handleEditProfile}
                            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            Edit Profile
                            </button>
                        )}





                    

                </div>

            </div>
            
        </div>
    
    </div>
  )
}

export default Profile



