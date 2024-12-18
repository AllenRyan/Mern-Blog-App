import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi"
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../Redux/user/userSlice';


function DashSideBar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
    const {currentUser} = useSelector( state => state.user)
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);
    const handleSignOut = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST'
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
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
       <Sidebar.ItemGroup className='flex flex-col gap-1'>
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item as='div' active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor="dark">
            Profile
        </Sidebar.Item>
        </Link>
       {currentUser.isAdmin&& (
        <Link to='/dashboard?tab=posts'>
        <Sidebar.Item icon={HiDocumentText} as='div' active={tab === 'posts'}>
         Posts
        </Sidebar.Item>
        </Link>
       )}
       {currentUser.isAdmin&& (
        <Link to='/dashboard?tab=users'>
        <Sidebar.Item icon={HiOutlineUserGroup} as='div' active={tab === 'users'}>
         Users
        </Sidebar.Item>
        </Link>
       )}
        
        <Sidebar.Item icon={HiArrowSmRight} as='div' onClick={handleSignOut}>
          Sign Out
        </Sidebar.Item>
       </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSideBar
