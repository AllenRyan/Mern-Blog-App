import React from 'react'
import CallToAction from '../components/CallToAction.jsx'

function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-gray-500 text-md'>Build fun and engaging projects while learning HTML, CSS, and JavaScript</p>
      <CallToAction/>
    </div>
  )
}

export default Projects
