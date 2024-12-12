import { Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

function DashProfile() {
    const {currentUser} = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef()
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
      console.log('uploading image');
    };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-6 px-6'>
          <input hidden ref={filePickerRef} onChange={handleImageChange} type="file"  accept='image/*'/>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
            <img onClick={() => filePickerRef.current.click()} className='rounded-full w-full h-full border-8 border-[lightgray] object-cover' src={imageFileUrl || currentUser.profilePic} alt="profilePic" />
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}></TextInput>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}></TextInput>
            <TextInput type='password' id='password' placeholder='password'></TextInput>
            <Button gradientDuoTone='purpleToBlue' type='submit' outline>Update</Button>
        </form>
        <div className='text-red-500 cursor-pointer flex justify-between mt-5 px-6 '>
            <span>Delete Account</span>
            <span>Sign Out</span>
        </div>
    </div>
  )
}

export default DashProfile
