import React, { useEffect, useState } from 'react';
import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UpdatePost() {
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    category: 'uncategorized',
    content: '',
  });
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData({
            _id: data.posts[0]._id || '',
            title: data.posts[0].title || '',
            category: data.posts[0].category || 'uncategorized',
            content: data.posts[0].content || '',
          });
        }
      } catch (error) {
        console.log(error);
        setPublishError('Failed to fetch post');
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(formData._id);
      console.log(currentUser._id);
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
      } else {
        console.log('Post updated successfully', data);
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
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
            value={formData.title}
          />
          <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })} value={formData.category}>
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
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>Update Post</Button>
      </form>
    </div>
  );
}

export default UpdatePost;
