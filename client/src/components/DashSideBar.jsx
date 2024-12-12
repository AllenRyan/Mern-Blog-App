import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiArrowSmRight, HiUser } from "react-icons/hi"
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function DashSideBar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
  
    useEffect(() => {
      console.log('location.search:', location.search);
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
       <Sidebar.ItemGroup>
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item as='div' active={tab === 'profile'} icon={HiUser} label={'User'} labelColor="dark">
            Profile
        </Sidebar.Item>
        </Link>
        <Sidebar.Item  icon={HiArrowSmRight} as='div'>
          Sign Out
        </Sidebar.Item>
       </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSideBar
