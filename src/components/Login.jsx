import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'
import { resetLoginError, userLogined, userLogout } from '../features/Loginslice';
import { LoginUser } from '../features/LoginAction';
import { toast } from 'react-toastify';

function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {error,is_Authenticated,user } = useSelector((state) =>state.login);
    
    const userInfocookie = Cookies.get("accessToken") && Cookies.get("detail")

    useEffect(() => {
        if (userInfocookie){

            dispatch(userLogined())
                }else{
                    dispatch(userLogout())

        }
    },[userInfocookie])

    useEffect(()=>{
        if (is_Authenticated && user.isSuperuser) {

            navigate("/admin");

          } else if (is_Authenticated && !user.isSuperuser) {

            navigate("/home");
          }else{

            navigate("/")
        }
    },[is_Authenticated])



    

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(regex.test(value) ? "" : "Invalid email")
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        validateEmail(value)
    }

    const ValidatePassword = (value) => {
        const regex =  /^.{8,}$/;
        setPasswordError(regex.test(value) ? "" : "The Password must be atleast 8 character")

    }

    function handlePassword(e) {
        const value = e.target.value
        setPassword(value)
        ValidatePassword(value)
    }


    function submitForm(e) {
        e.preventDefault();
        if (!passwordError && !emailError){
            console.log(email,'email')
            const data = {
                email: email,
                password:password
            }
            console.log('bbbbbbbbbbbbbbbbbbb')
            const login = dispatch(LoginUser(data));
            
        }else{
            console.log('ddddddddddddddd')
            toast.error(emailError ? emailError : passwordError)
        }
    }







  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full'>
            <div className='bg-white shadow-md rounded-lg p-8'>

                <h2 className='text-2xl font-bold text-gray-900 mb-8 text-center'>
                Login to your account
                </h2>
                    
                    
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"  >
                        <form  className="space-y-6" onSubmit={(e) => submitForm(e)}>
                            <div  >
                                <label htmlFor='email'  className="block text-sm font-medium leading-6 text-gray-900">
                                    Email Address
                                    <div>
                                        <input
                                        id='email'
                                        name='email'
                                        type='email'
                                        value={email}
                                        onChange={(e) => handleEmailChange(e)}
                                        autoComplete='email'
                                        required   
                                        className={error?.email || emailError ?   "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-red-500 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 p-5" : 
                                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                        }
                                        />
                                        <div className='error h-[10px] text-red-400'>
                                            { (error && error.email) ? error?.email : emailError}

                                        </div>
                                    </div>
                                </label>
                            </div>

                            <div className="">
                                <label htmlFor='password' className="block text-sm font-medium leading-6 text-gray-900" >
                                    Password
                                </label>

                                <div>
                                    <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    value={password}
                                    onChange={(e) => handlePassword(e)}
                                    autoComplete='current-password'
                                    required
                                    className={error?.password || passwordError ?   "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-red-500 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 p-5" : 
                                         "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                    }

                                    />

                                        <div className='error h-[10px] text-red-400'>
                                            { (error && error.password) ? error?.password : passwordError}
                                        </div>
                                </div>

                            </div>

                            <div>
                                <button
                                type='submit'
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                >
                                    Signin
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 text-center">
                         Don't have an account?{' '}
                        <Link to='/signup' className='text-indigo-600 hover:underline'>
                        Sign Up
                        </Link>
                        </div>

                    </div>

                    </div>
        </div>
      
    </div>    
  )
}

export default Login