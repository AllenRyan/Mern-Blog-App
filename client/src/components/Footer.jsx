import React from 'react';
import { Footer } from 'flowbite-react';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


function FooterComp() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      {/* global styles for footer  */}
      <div className='w-full max-w-7xl mx-auto'>
         
         <div className='grid justify-between w-full sm:flex md:grid-cols-1 '>
          {/* logo footer  */}
            <div>
            <h1 className='whitespace-nowrap text-1xl   font-bold dark:text-white'><span className='px-2 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl text-white '>Abrar's</span>Blog</h1>
            </div>
            <div></div>
            {/* colum for footer  */}
            <div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-8'>
            <div>
            <Footer.Title className='mt-5 mb-4' title='About' />
           <Footer.LinkGroup col>
            <Footer.Link>
              100 JS Projects
            </Footer.Link>
            <Footer.Link>
              Abrar's Blog
            </Footer.Link>
           </Footer.LinkGroup>
              </div>
              <div>
            <Footer.Title className='mt-5 mb-4' title='Follow us' />
           <Footer.LinkGroup col>
            <Footer.Link
             href='https://github.com/AllenRyan' 
             target='_blank' 
             rel='noopener norefferer'
            >
             
              Github
            </Footer.Link>
            <Footer.Link
              href='https://www.linkedin.com/in/abrar-khan-91ab37310/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BN3B7rU04Spaq%2BrizJw%2Bsag%3D%3D'
              target='_blank'
              rel='noopener norefferer'
            >
              Linkedin
            </Footer.Link>
           </Footer.LinkGroup>
            </div>
              <div>
            <Footer.Title className='mt-5 mb-4'  title='Legal' />
           <Footer.LinkGroup col>
            <Footer.Link
             href='#' 
             target='_blank' 
             rel='noopener norefferer'
            >
             
              Privacy & Policy
            </Footer.Link>
            <Footer.Link
              href='#'
              target='_blank'
              rel='noopener norefferer'
            >
              Terms & Conditions
            </Footer.Link>
           </Footer.LinkGroup>
            </div>
           
         </div>
         </div>
         <Footer.Divider />
         <div className='w-full sm:flex sm:items-center sm:justify-between'>
         <Footer.Copyright href='#' by="Abrar's blog" year={new Date().getFullYear()}/>

         <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
          <Footer.Icon href='#' icon={FaFacebook} />
          <Footer.Icon href='#' icon={FaGithub} />
          <Footer.Icon href='#' icon={FaLinkedin } />
          <Footer.Icon href='#' icon={FaInstagram} />
         </div>
         </div>
         
    
         </div>
    </Footer>
  )
}

export default FooterComp
