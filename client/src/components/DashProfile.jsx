import { Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateStart, updateSuccess, updateFailure, signInSuccess, signInFailure} from '../Redux/user/userSlice';

function DashProfile() {
    const {currentUser} = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef();
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const handleChange =  (e) => {
      setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(Object.keys(formData).length === 0 ){
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
        console.log(formData)
        const data = await res.json();
        if(!res.ok){
          dispatch(updateFailure(data.message))
        }else{
          dispatch(updateSuccess(data))
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
            <span>Delete Account</span>
            <span>Sign Out</span>
        </div>
    </div>
  )
}

export default DashProfile
