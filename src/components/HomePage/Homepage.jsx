import React,{useEffect, useState} from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { userLogout } from '../../features/Loginslice';

function Homepage() {

    const[showDropdown,setShowDropDown] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const is_Authenticated = useSelector((state) =>state.login.is_Authenticated)
   
    const handleDropdown = () => {
        setShowDropDown(!showDropdown)
    }

    useEffect(() => {
        if(is_Authenticated){
            navigate("/home")
        }else{
            navigate("/")
        }
    },[is_Authenticated])

  return (

    <div className='bg-neutral-700 w-full min-h-screen '>
        <nav className='bg-black flex w-full  justify-between items-center mt-0 py-4 px-8 '>
            <div>

                <h1 className='text-2xl text-white  font-bold'> My Website</h1>
            </div>


            <div>

                    <div className=' mx-10'>


                        <button 
                        type='button'
                        onClick={handleDropdown}
                        className='bg-blue-700 inline-flex items-center justify-center w-full rounded-md border border-gray-300  shadow-sm px-4 py-2  text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        id='dropdown-menu'
                        aria-haspopup="true"
                        aria-expanded="true"
                        
                        >
                            UserProfile

                            <svg
                            className="  -mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            >

                            <path
                                fillRule="evenodd"
                                d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />

                            <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM1 10a9 9 0 1118 0 9 9 0 01-18 0z"
                            clipRule="evenodd"
                            />

                            </svg>    
                            
                        </button>

                        {showDropdown && (

                            <div 
                            className='origin-top-right absolute mt-2  w-40 rounded-md shadow-lg bg-white ring-1 ring-white ring-opacity-5'
                            role="menu"
                            aria-orientation="vertical" 
                            aria-labelledby="dropdown-menu" 
                            >

                                <div className='py-1' role='None'>
                                    <button 
                                    className='bg-white block px-4 py-2 text-sm text-black hover:bg-gray-300 w-full h-full text-left'
                                    role='menu'
                                    onClick={() => navigate("/profile")}
                                    
                                    >
                                        View Profile
                                    </button>


                                    <button 
                                    className='bg-white block px-4 py-2 text-sm text-black hover:bg-gray-300 w-full h-full text-left'
                                    role='menu'
                                    onClick={() =>{dispatch(userLogout())}}
                                    >
                                        Logout
                                    </button>

                                </div>    
                            </div>    




                        )}



                    </div>

               
            </div>    
  

        </nav>


        <div className='flex w-full h-full items-center justify-center min-h-screen'>
            <h1 className='text-3xl text-white font-bold'> Welcome to my Website</h1>
        </div>

    </div>  

  )
}

export default Homepage