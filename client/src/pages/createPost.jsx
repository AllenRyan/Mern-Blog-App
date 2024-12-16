import React, { useState } from 'react';
import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
      } else {
        console.log('Post created successfully', data);
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create Post</h1>
      {publishError && <p className="text-red-500">{publishError}</p>}
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
          />
          <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>
        <div className='flex items-center justify-between gap-4 border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' />
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload Image</Button>
        </div>
        <ReactQuill
          onChange={(value) => setFormData({ ...formData, content: value })}
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
      </form>
    </div>
  );
}

export default CreatePost;
