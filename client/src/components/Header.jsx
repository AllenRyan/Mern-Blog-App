import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from '../Redux/user/themeSlice.js'
import { signOutSuccess } from '../Redux/user/userSlice.js';


function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {theme} = useSelector(state => state.theme)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
     const urlParams = new URLSearchParams(location.search);
     const searchTermFromUrl = urlParams.get('searchTerm')
     if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl)
     }
    },[location.search])
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = res.json();
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
   <Navbar className='border-b-2 flex justify-between items-center'> 
   <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white'><span className='px-2 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl text-white'>Abrar's</span>Blog</Link>
   <form onSubmit={handleSubmit}>
   <TextInput 
   className='hidden md:block'
   type='text'
   placeholder='search...'
   value={searchTerm}
   onChange={(e) => setSearchTerm(e.target.value)}
  
/>
   </form>
   <Button className='w-10 h-8 justify-center items-center md:hidden' color='gray' pill>
    <AiOutlineSearch className='text-black dark:text-gray-200 text-xl'/>
   </Button>
   <div className='flex gap-2 items-center md:order-2'> 
    <Button onClick={() => dispatch(toggleTheme()) } color='gray' className='w-10 h-8 justify-center items-center hidden sm:flex' pill>
       {theme === 'light' ? <FaMoon/> : <FaSun/> }
    </Button>
    {currentUser ? (
        <Dropdown
        arrowIcon={false}
        inline
        label={
            <Avatar alt='user Avatar' img={currentUser.profilePic} rounded />
        }
        
        >
     <Dropdown.Header>
<span className='block text-sm'>@{currentUser.username}</span>
<span className='block text-sm font-medium truncate'>{currentUser.email}</span>
</Dropdown.Header>
        <Link to={'/dashboard?tab=profile'}>
        <Dropdown.Item className='text-base'>Profile</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className='text-base' onClick={handleSignOut}>Sign Out</Dropdown.Item>
        </Link>
        </Dropdown>
    ): 
    <Link to="/sign-in">
    <Button gradientDuoTone="purpleToBlue"
    outline>Sign In</Button>
    </Link>
}
    <Navbar.Toggle />
   </div>
   <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
            <Link to='/'>
            Home
            </Link>
           </Navbar.Link>
           <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to='/about'>
            About
            </Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to='/projects'>
            Projects
            </Link>
        </Navbar.Link>
    </Navbar.Collapse>
   </Navbar>
  )
}

export default Header
