import React,{useCallback, useEffect, useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { resetError } from '../features/user';
import { registerUser } from '../features/action';
import { toast } from 'react-toastify';

function Signup() {

  const [first_name,setFirst_name] = useState("");
  const [last_name,setLast_name] = useState("");
  const [Email,setEmail] = useState("");
  const [Password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("")
  const [FirstNameError,setFirstNameError] = useState("");
  const [LastNameError,setLastNameError] = useState("");
  const [EmailError,setEmailError] = useState("");
  const [PasswordError,setPasswordError] =useState("")
  const [ConfirmPasswordError,setConfirmPasswordError] = useState("")
  
  const valid_error =  useSelector((state) => state.user.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {is_Authenticated} = useSelector((state) =>state.login)

  useEffect(() => {
    if (is_Authenticated){
      navigate("/home");
      console.log('homehomehomehomeheomeheomeheomeheomehoem')
    }
  },[is_Authenticated])
  
  useEffect(()=>{
    dispatch(resetError());
  },[first_name,last_name,Email,Password])

  
  const validateFirst_name = useCallback((value)=>{
    const regex = /^[a-zA-Z_]{3,15}$/;
    setFirstNameError(regex.test(value) ? "" : "Invalid first_name ")

  },[first_name])

  const handle_first_name = (e) => {
    const value = e.target.value
    setFirst_name(value)
    validateFirst_name(value);
  }


  const validateLast_name = useCallback((value)=>{
    const regex = /^[a-zA-Z_]{3,15}$/;
    setLastNameError(regex.test(value) ? "" : "Invalid Last_name ")

  },[first_name])

  const handle_Last_name = (e) => {
    const value = e.target.value
    setLast_name(value)
    validateLast_name(value);
  }


  const validateEmail = useCallback((value)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(regex.test(value)? "" : "Invalid Email format")
  })


  const handleEmail = (e) => {
    const value = e.target.value
    setEmail(value)
    validateEmail(value)
  }

  const ValidatePassword = useCallback((value) => {
    const regex = /^.{8,}$/;
    const isValid = regex.test(value);
    setPasswordError(
      isValid? "" : "Password must be at least 8 Characters"
    )
    if (isValid && confirmPassword){
      setConfirmPasswordError(value === confirmPassword? "" : "The password do not match")
    }

  },[confirmPassword])

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value)
    ValidatePassword(value);
  }


  const validateConfirmPassword = useCallback((value) => {
    setConfirmPasswordError(value === Password ? "" : "The password do not match");
  },[Password])
  

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value)
    validateConfirmPassword(value);

  }



  const handleRegistration = (e) => {
    e.preventDefault();
    if(
      !EmailError &&
      !FirstNameError&&
      !LastNameError &&
      !PasswordError &&
      !ConfirmPasswordError
    ){
      const register = dispatch(registerUser({
        first_name:first_name,
        last_name:last_name,
        email:Email,
        password:Password,
      }))
      .unwrap()
      .then(()=> {

        navigate('/');

      })
      .catch(() => {
        console.log(valid_error,'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
        
        toast.error(Registration_error,'ddddddddddddddd')


          
      })


    }else{
      toast.error("Give proper credentials")

    }
  };  

  



  return (
    <div className=' flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>
        <div className='bg-white shadow-md rounded-lg p-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-8 text-center'>Create and Account</h2>

          <form className='space-y-6'  onSubmit={(e) =>handleRegistration(e)}>

            <div >
              <label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
                First Name
              </label>
              <input

              id='first-name'
              name='first-name'
              type='text'
              value={first_name}
              onChange={(e) => handle_first_name(e)}
              autoComplete='given-name'
              required  
              className={valid_error.first_name || FirstNameError ? 'mt-1 w-full rounded-md border border-red-500 shadow-sm focus:border-red-500 block text-sm p-2'
                :'mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 block text-sm p-2'}
              />
              
              <div className='error h-[10px] text-red-600'>
                {valid_error.first_name? valid_error.first_name: FirstNameError}
              </div>

            </div>  

            <div>
              <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                Last Name
              </label>
              <input
                id='last-name'
                name='last-name'
                type='text'
                value={last_name}
                onChange={(e)=>handle_Last_name(e)}
                autoComplete='family-name'
                required
                className={valid_error.last_name || LastNameError ? 'mt-1 w-full rounded-md border border-red-500 shadow-sm focus:border-red-500 block text-sm p-2'
                :'mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 block text-sm p-2'}    

                />

              <div className='error h-[10px] text-red-600'>
                {valid_error.last_name? valid_error.last_name: LastNameError}
              </div>

            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email
              </label>

              <input
              id='email'
              name='email'
              type='email'
              value={Email}
              onChange={(e) => handleEmail(e)}
              autoComplete='email'
              required
              className={valid_error.email || EmailError ? 'mt-1 w-full rounded-md border border-red-500 shadow-sm focus:border-red-500 block text-sm p-2'
                :'mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 block text-sm p-2'}
              />

              <div className='error h-[10px] text-red-600'>
                {valid_error.email? valid_error.email: EmailError}
              </div>

            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>

              <input

              id='password'
              name='password'
              type='password'
              value={Password}
              onChange={(e) => handlePassword(e)}
              autoComplete='new-password'
              required
              className={valid_error.password || PasswordError ? 'mt-1 w-full rounded-md border border-red-500 shadow-sm focus:border-red-500 block text-sm p-2'
                :'mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 block text-sm p-2'}   
              />

               <div className='error h-[10px] text-red-600'>
                {valid_error.password? valid_error.password: PasswordError}
              </div>
            </div>

            <div>
              <label htmlFor='confirm-password' className='block text-sm font-medium text-gray-700'>
                Confirm Password
              </label>

              <input
              id='confirm-password'
              name='confirm-password'
              type='password'
              value={confirmPassword}
              onChange={(e)=>handleConfirmPassword(e)}
              autoComplete='new-password'
              className={valid_error.password || PasswordError ? 'mt-1 w-full rounded-md border border-red-500 shadow-sm focus:border-red-500 block text-sm p-2'
                :'mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 block text-sm p-2'}      
              />

              <div className='error h-[10px] text-red-600'>
                {ConfirmPasswordError != null ? ConfirmPasswordError : ""}
              </div>

            </div>

            <div>
              <button
              type='submit'
              className='w-full flex justify-center py-2 px-4  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700  '
              >
                Register

              </button>
            </div>

          </form>

          <div className='mt-4 text-center'>
          Already have an account?{' '}
          <Link to='/' className='text-indigo-600 hover:underline'>
            Login
          </Link>
        </div>

        </div>
      </div>
    
    </div>
  )
}

export default Signup