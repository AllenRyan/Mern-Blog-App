import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/dashPosts';
import DashUsers from '../components/DashUsers';

function Dashboard() {
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
    <div className='min-h-screen flex flex-col md:flex-row'>
      
      {/* Sidebar */}
      <div className='md:w-56'>
      <DashSideBar/>
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile/>}
      {/* posts */}
      {tab === 'posts' && <DashPosts/>}
      {/* users... */}
      {tab === 'users' && <DashUsers/>}
    </div>
  );
}

export default Dashboard;
