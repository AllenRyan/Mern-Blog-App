import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
function FooterComp() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
     <div>
         <div>
            <div>
            <Link to='/' className=' whitespace-nowrap text-1xl   font-bold dark:text-white'><span className='px-2 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl text-white '>Abrar's</span>Blog</Link>
            </div>
         </div>
     </div>
    </Footer>
  )
}

export default FooterComp
