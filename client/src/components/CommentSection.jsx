import { Alert, Button, Textarea} from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Comments from './Comments'
import { Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function CommentSection({postId}) {
    const {currentUser} = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null)
    const [comments, setComments] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [commentIdToDelete, setCommentIdToDelete] = useState(null)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(comment.length > 200){
            return;
        }
        try {
            const res = await fetch('/api/comments/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content: comment, postId, userId: currentUser._id})
            });
            const data = await res.json()
            if(res.ok){
                setComment('')
                setCommentError(null)
                setComments([data, ...comments])
            }
        } catch(error){
           setCommentError(error.message)
        }
        

    }

    useEffect(() => {
      const getComments = async () => {
      try {
        const res = await fetch(`/api/comments/getPostComments/${postId}`);
        if(res.ok){
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message)
      }
      }
      getComments()
    },[postId])

    const handleLikes = async (commentId) => {
      try {
        if(!currentUser){
         navigate('/sign-in');
         return;
        }
        const res = await fetch(`/api/comments/likeComment/${commentId}`, {
          method: "PUT",
        });
        if(res.ok){
          const data = await res.json();
          setComments(comments.map((comment) => (
            comment._id === commentId ? {
              ...comment,
              likes: data.likes,
              numberOfLikes: data.likes.length,
            } : comment
          )))
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    const handleEdit = async (comment, editedContent) => {
      setComments(
        comments.map((c) => (
          c._id === comment._id ? {...c, content: editedContent} : c
        ))
      )
    }
    const handleDelete = async (commentId) => {
      setShowModal(false)
      try {
        if(!currentUser){
          navigate('/sign-in');
          return;
        }
        const res = await fetch(`/api/comments/deleteComment/${commentId}`, {
          method: "DELETE",
        })
        if(res.ok){
          const data = await res.json()
          setComments(comments.filter((comment) => comment._id !== commentId))
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex gap-2 items-center my-5 text-gray-500 text-xs'>
            <p>Signed in as:</p>
            <img className='rounded-full w-5 h-5 object-cover' src={currentUser.profilePic} alt={currentUser.username}/>
            <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
            @{currentUser.username}
            </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-2'>
            You must be signed in to comment
            <Link className='text-blue-500 hover:underline' to={'/signin'}>
            Sign in
            </Link>
        </div>
      )}
      {currentUser ? (
        <>
        <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3 '>
            <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}/>
            <div className='flex justify-between items-center gap-2 mt-5'>
                <p className='text-gray-500 text-sm'>{200 - comment.length}</p>
                <Button outline gradientDuoTone='purpleToPink' type='submit'>
                    Submit
                </Button>
            </div>
            {commentError && 
            <Alert color='failure' className='mt-5'>{commentError}</Alert>
            }
        </form>
        {comments.length === 0 ? (
          <p className='text-sm my-5'>No comments yet!</p>
        ) : (
          <>
          <div className='text-sm my-5 flex items-center gap-2'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {
            comments.map(comment => (
              <Comments key={comment._id} comment={comment} onLike={handleLikes} onEdit={handleEdit} onDelete={(commentId)=>{
                setShowModal(true)
                setCommentIdToDelete(commentId)
              }}/>
            ))
          }
          </>
        )}
        </>
      ) : ''}
     
       <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                   <Modal.Header />
                   <Modal.Body>
                     <div className='text-center'>
                       <HiOutlineExclamationCircle  className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                       <h3 className='text-lg mb-5 text-gray-500 dark:text-gray-400'>Are you sure you want to delete this Comment</h3>
                       <div className='flex gap-4'>
                         <Button color='failure' onClick={()=> handleDelete(commentIdToDelete)}>
                           Yes I'm Sure
                         </Button>
                         <Button color='grey' onClick={() => setShowModal(false)}>
                           No, Cancel
                         </Button>
                       </div>
                     </div>
                   </Modal.Body>
                 </Modal>
    </div>

  )
}

export default CommentSection
