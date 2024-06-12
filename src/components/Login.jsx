import React from 'react'

function Login() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full'>
            <div className='bg-white shadow-md rounded-lg p-8'>

                <h2 className='text-2xl font-bold text-gray-900 mb-8 text-center'>
                Login to your account
                </h2>



                    
                    
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"  >
                        <form  className="space-y-6" action="#" method="POST">
                            <div  >
                                <label htmlFor='email'  className="block text-sm font-medium leading-6 text-gray-900">
                                    Email Address
                                    <div>
                                        <input
                                        id='email'
                                        name='email'
                                        type='email'
                                        autoComplete='email'
                                        required   
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
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
                                    autoComplete='current-password'
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                    />
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
                    </div>

                    </div>
        </div>
      
    </div>    
  )
}

export default Login