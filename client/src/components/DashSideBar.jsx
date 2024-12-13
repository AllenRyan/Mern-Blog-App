import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiArrowSmRight, HiUser } from "react-icons/hi"
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../Redux/user/userSlice';

function DashSideBar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
  
    useEffect(() => {
      console.log('location.search:', location.search);
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
       <Sidebar.ItemGroup>
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item as='div' active={tab === 'profile'} icon={HiUser} label={'User'} labelColor="dark">
            Profile
        </Sidebar.Item>
        </Link>
        <Sidebar.Item icon={HiArrowSmRight} as='div' onClick={handleSignOut}>
          Sign Out
        </Sidebar.Item>
       </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSideBar
