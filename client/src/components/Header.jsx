import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

function Header() {
    const path = useLocation().pathname;
  return (
   <Navbar className='border-b-2 flex justify-between items-center'> 
   <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white'><span className='px-2 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl text-white'>Abrar's</span>Blog</Link>
   <form>
   <TextInput 
   className='hidden md:block'
   type='text'
   placeholder='search...'
  
/>
   </form>
   <Button className='w-10 h-8 justify-center items-center md:hidden' color='gray' pill>
    <AiOutlineSearch className='text-black text-xl'/>
   </Button>
   <div className='flex gap-2 items-center md:order-2'> 
    <Button color='gray' className='w-10 h-8 justify-center items-center hidden sm:flex' pill>
        <FaMoon />
    </Button>
    <Link to="/sign-in">
    <Button gradientDuoTone="purpleToBlue"
    >Sign In</Button>
    </Link>
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
