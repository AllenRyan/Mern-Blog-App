import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutSuccess,} from '../Redux/user/userSlice';
import {HiOutlineExclamationCircle} from "react-icons/hi"

function DashProfile() {
    const {currentUser, error} = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef();
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false)

    const handleChange =  (e) => {
      setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(Object.keys(formData).length === 0 ){
        setUpdateUserError('No Changes Made')
          return;
      }
      try {
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`,{
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if(!res.ok){
          dispatch(updateFailure(data.message))
          setUpdateUserError(data.message)
        } else{
          dispatch(updateSuccess(data))
          setUpdateUserSuccess("User Profile Updated Successfully")

        }
       
      } catch (error) {
        dispatch(updateFailure())
      }
    }

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
   }
    useEffect(() => {
      uploadImage()
    },[imageFile]);
    const uploadImage = async () => {
      console.log('uploading image')
    };

    const handleDeleteUser = async () => {
           setShowModal(false);
           try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
              method: "DELETE",
            });
            const data = await res.json();
            if(!res.ok){
              dispatch(deleteUserFailure(data.message))
            }else {
              dispatch(deleteUserSuccess())
            }
           } catch (error) {
            
           }
        }
    const handleSignOut = async () => {
      try {
        const res = await fetch('api/user/signout', {
          method: "POST",
        });
        const data = await res.json();
        if(!res.ok){
          console.log(data.message)
        }else{
          dispatch(signOutSuccess())
        }
      } catch (error) {
        console.error(error)
      }
    }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 px-6'>
          <input hidden ref={filePickerRef} onChange={handleImageChange} type="file"  accept='image/*'/>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
            <img onClick={() => filePickerRef.current.click()} className='rounded-full w-full h-full border-8 border-[lightgray] object-cover' src={imageFileUrl || currentUser.profilePic} alt="profilePic" />
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}></TextInput>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange}></TextInput>
            <TextInput type='password' id='password' placeholder='password' onChange={handleChange}></TextInput>
            <Button gradientDuoTone='purpleToBlue' type='submit' outline>Update</Button>
        </form>
      
        <div className='text-red-500 cursor-pointer flex justify-between mt-5 px-6 '>
            <span onClick={() => setShowModal(true)}>Delete Account</span>
            <span onClick={handleSignOut}>Sign Out</span>
        </div>
        {updateUserSuccess && 
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
        }

        {updateUserError && 
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
        }
        {error && 
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
        }
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle  className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='text-lg mb-5 text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account</h3>
              <div className='flex gap-4'>
                <Button color='failure' onClick={handleDeleteUser}>
                  Yes I'm Sure
                </Button>
                <Button color='grey' onClick={() => setShowModal(false)}>
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default DashProfile
