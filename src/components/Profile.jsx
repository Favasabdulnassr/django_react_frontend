import React, { useEffect, useState,useCallback } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserProfile } from '../features/userProfileSlice'
import { updateUserProfile } from '../features/userProfileSlice'
import { fetchImage,UploadImage,DeletImage } from '../features/Image'
import { base_url } from '../features/base_url'
import { toast } from 'react-toastify'

function Profile() {




    const [editMode,setEditMode] = useState(false)

    const [errors, setErrors] = useState({
      firstName: '',
      lastName: '',
      email: '',
    });


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
      });
      
    
    const user = useSelector((state)=>state.userProfile.user)
    const is_Authenticated = useSelector((state)=>state.login.is_Authenticated)
    const navigate = useNavigate()


    const dispatch = useDispatch(); // Get dispatch function from Redux

    const [profileImage, setProfileImage] = useState(null); // State to manage profile image file
    const [previewImage, setPreviewImage] = useState('/placeholder.png'); // Default or preview image URL

    
   
    

    useEffect(() => {
        if (!is_Authenticated) {
          navigate('/');
        } else {
            console.log('userprofile fetch calll...............................')
          dispatch(fetchUserProfile());
          dispatch(fetchImage())
        }
      }, [is_Authenticated, dispatch, navigate]);
    
    

      const validateFirstName = useCallback((value) => {
        const regex = /^[a-zA-Z_]{3,15}$/;
        return regex.test(value) ? '' : 'Invalid first name';
      }, []);
    
      const validateLastName = useCallback((value) => {
        const regex = /^[a-zA-Z_]{3,15}$/;
        return regex.test(value) ? '' : 'Invalid last name';
      }, []);
    
      const validateEmail = useCallback((value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) ? '' : 'Invalid email format';
      }, []);
      
      

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
            console.log('userrrrrrrrrrrrrrrrrrr',user);
            console.log('imageeeeeeeeeeeeeeeeeeeeeee',user.profile)
        }
        
    },[dispatch,user])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,

        }));

        console.log()

      
        let error = '';
        switch (name) {
          case 'firstName':
            error = validateFirstName(value);
            break;
          case 'lastName':
            error = validateLastName(value);
            break;
          case 'email':
            error = validateEmail(value);
            break;
          default:
            break;
        }
    
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error,
        }));
        


      };
    
      const handleEditProfile = () => {
        setEditMode(true);
      };
    
      const handleSaveProfile = () => {
        if (!errors.firstName && !errors.lastName && !errors.email) {
          setEditMode(false);
          dispatch(updateUserProfile(formData))
            .unwrap()
            .then(() => {
              toast.success('Profile updated successfully');
            })
            .catch((error) => {
              toast.error('Error updating profile');
              console.error(error);
            });
        } else {
          toast.error('Please correct the errors before saving');
        }
      };





      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setProfileImage(file);
          setPreviewImage(URL.createObjectURL(file));
          console.log(previewImage)
        }
      };

    
      const handleUploadImage = () => {
        if (profileImage) {
          console.log('profileImagedududududud:',profileImage)
          const formData = new FormData();

          formData.append('profile', profileImage); // Use append method to add file to FormData
          console.log('afterappend formdata:',formData)

          dispatch(UploadImage(formData)).unwrap().then(() => {
            // Optional: You can fetch updated user profile or image after successful upload
            dispatch(fetchUserProfile()); // Example: Fetch updated user profile
            dispatch(fetchImage()); // Example: Fetch updated image data
            navigate("/home")
            setPreviewImage(null)
          }).catch((error) => {
            console.error('Error uploading image:', error);
            // Handle error state or show toast/message to user
          });
        }
      };
    
      const handleDeleteImage = () => {
        dispatch(DeletImage());
        setPreviewImage('/placeholder.png'); 
        navigate("/home")
      };
    
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8'>
        <div className='max-w-md w-full  shadow-md rounded-lg p-6'>
            <div className='flex items-center justify-center'>
                <label htmlFor='profile-image' className=' cursor-pointer'>
                   {user?.profile?( <img
                     src={`http://127.0.0.1:8000${user?.profile}`}
                     alt='profile'
                     className=' h-32 w-32 rounded-full object-cover'
                    />):( <img
                      src={previewImage}
                      alt='profile'
                      className='bg-green-700 h-32 w-32 rounded-full object-cover'
                      />)
                      }

                    <input
                    type='file'
                    id='profile-image'
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageChange}

                    
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
                                id='lastName'
                                name='lastName'
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
                                name="email"  // Ensure name matches the state key
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




                { user?.profile ? (
                    <button
                    type='button'
                    onClick={handleDeleteImage}
                    className='mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    >
                    Delete Image
                    </button>
                ) : (
                    <button
                    type='button'
                    onClick={handleUploadImage}
                    className='mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                    Upload Image
                    </button>
              )}

            </div>
            
        </div>
    
    </div>
  )
}

export default Profile



