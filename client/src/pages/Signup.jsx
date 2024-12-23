import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function handleChange(event) {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out All fields');
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false)
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      // console.log(data)
     
      if (res.ok) {
        navigate('/sign-in')
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput onChange={handleChange} type='text' placeholder='Username'
                id='username'
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput onChange={handleChange} type='text' placeholder='name@gmail.com'
                id='email'
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput onChange={handleChange} type='password' placeholder='Password'
                id='password'
              />
            </div>
            {/* Button  */}
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
              <>
                <Spinner size='sm' /><span className='pl-3'>Loading...</span>
              </>

            ) : 'Sign Up'}</Button>
            <OAuth/>
          </form>
          <div className='flex mt-5 gap-1'>
            <span>Hava an account?</span>
            <Link className='text-blue-500 hover:text-blue-800' to='/sign-in'>Sign In</Link>
          </div>
          {errorMessage &&
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          }
        </div>
      </div>

    </div>
  )
}

export default Signup
