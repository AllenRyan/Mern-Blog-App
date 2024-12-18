import { Button } from 'flowbite-react'
import React from 'react'

function CallToAction() {
  return (
    <div className='flex flex-col items-center sm:flex-row p-3 border border-teal-500 justify-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
      <h2 className='font-bold text-2xl'>Want to know the importance of nature?</h2>
      <p className='pt-2 text-gray-500'>Check out these resources with quranic ayahs and hadeeth</p>
      <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none mt-2 self-center'><a href='https://www.google.com' target='_blank' rel='noopener noreferrer'>Learn More About Nature </a></Button>
      </div>
      <div className='p-8 max-w-3xl flex-1'>
        <img className='w-full object-cover rounded-xl' src="https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk=" alt="nature image"/>
      </div>
    </div>
  )
}

export default CallToAction
