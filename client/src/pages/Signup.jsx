import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8'>
   {/* left side  */}
   <div className='flex-1'>
       <Link to='/' className=' whitespace-nowrap text-4xl   font-bold dark:text-white'><span className='px-2 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl text-white '>Abrar's</span>Blog</Link>
       <p className='mt-4  text-sm'>Welcome to My Blog!  Sign up now to start your journey, connect with like-minded individuals, and share your voice with the world. Your story matters – let's write it together!</p>
       </div>
       {/* right screen  */}
       <div className='flex-1'>
        <form className='flex flex-col gap-4'>
          <div>
            <Label value='Your username' />
            <TextInput type='text' placeholder='Username'
            id='username'
            />
          </div>
          <div>
            <Label value='Your email' />
            <TextInput type='text' placeholder='name@gmail.com'
            id='email'
            />
          </div>
          <div>
            <Label value='Your password' />
            <TextInput type='text' placeholder='Password'
            id='password'
            />
          </div>
          {/* Button  */}
          <Button gradientDuoTone='purpleToPink' type='submit'>Sign Up</Button>
        </form>
        <div className='flex mt-5 gap-1'>
          <span>Hava an account?</span>
          <Link className='text-blue-500 hover:text-blue-800' to='/sign-in'>Sign In</Link>
        </div>
       </div>
      </div>
    
    </div>
  )
}

export default Signup
