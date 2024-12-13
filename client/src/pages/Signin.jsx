import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../Redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';



function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleChange(event) {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all the fields'))
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message))
      }
     
     
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      return dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8'>
        {/* left side  */}
        <div className='flex-1'>
          <Link to='/' className=' whitespace-nowrap text-4xl   font-bold dark:text-white'><span className='px-2 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl text-white '>Abrar's</span>Blog</Link>
          <p className='mt-4  text-sm'>Welcome to My Blog!  Sign In now to start your journey, connect with like-minded individuals, and share your voice with the world. Your story matters – let's write it together!</p>
        </div>
        {/* right screen  */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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

            ) : 'Sign In'}</Button>
            <OAuth />
          </form>
          <div className='flex mt-5 gap-1'>
            <span>Does not have an account?</span>
            <Link className='text-blue-500 hover:text-blue-800' to='/sign-up'>Sign Up</Link>
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

export default SignIn
