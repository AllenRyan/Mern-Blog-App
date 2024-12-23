import { Button, Table, Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import {FaCheck, FaTimes} from 'react-icons/fa'


function DashComments() {
   const { currentUser } = useSelector(state => state.user)
   const [comments, setComments] = useState([])
   const [showMore, setShowMore] = useState(true)
   const [showModal, setShowModal] = useState(false)
   const [commentIdToDelete, setCommentIdToDelete] = useState(null)
   
    useEffect (() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comments/getcomments`);
                const data = await res.json();
                if(res.ok){ 
                    setComments(data.comments)
                    if(data.comments.length < 9){
                        setShowMore(false)
                    }
                }

            } catch(error) {
                console.log(error)
            }
        }
        if(currentUser.isAdmin){
            fetchComments()
        }
    }, [currentUser._id])
    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`/api/comments/getcomments?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setComments((prev) => [...prev, ...data.comments]);
            }
            if(!data.users.length < 9){
                setShowMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteComment = async () => {
        setShowModal(false)
          try {
            const res = await fetch(`/api/comments/deleteComment/${commentIdToDelete}`,{
                method: 'DELETE'
            });
            const data = await res.json();
            if(res.ok){
                setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete))
                setShowModal(false)
            }
          } catch (error) {
            console.log(error.message)
          }
    }
  
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin && comments.length > 0 ? (
        <>
     <Table hoverable className='shadow-md'>
        <Table.Head>
        <Table.HeadCell>Date Updated</Table.HeadCell>
        <Table.HeadCell>Comment Content</Table.HeadCell>
        <Table.HeadCell>Number of likes</Table.HeadCell>
        <Table.HeadCell>PostId</Table.HeadCell>
        <Table.HeadCell>UserId</Table.HeadCell>
        <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
       {comments.map((comment) => (
       <Table.Body className='divide-y' key={comment._id}>
       <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
        <Table.Cell>
        {new Date(comment.createdAt).toLocaleDateString()}
        </Table.Cell>
        <Table.Cell>
           {comment.content}
        </Table.Cell>
        <Table.Cell>
        {comment.numberOfLikes}
        </Table.Cell>
        <Table.Cell className='font-medium'>
            {comment.postId}
        </Table.Cell>
        <Table.Cell className='font-medium'>
            {comment.userId}
        </Table.Cell>
        <Table.Cell>
            <span className='cursor-pointer font-medium text-red-500 hover:underline' onClick={() => {
                setShowModal(true);
                setCommentIdToDelete(comment._id);
            } }>Delete</span>
        </Table.Cell>
       </Table.Row>
       </Table.Body>
    ))}
     </Table>
      {
        showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
            Show more
            </button>
        )
     }
     </>
    ) : (<p>You have no comments yet</p>)}

     <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
              <Modal.Header />
              <Modal.Body>
                <div className='text-center'>
                  <HiOutlineExclamationCircle  className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                  <h3 className='text-lg mb-5 text-gray-500 dark:text-gray-400'>Are you sure you want to delete this user</h3>
                  <div className='flex gap-4'>
                    <Button color='failure' onClick={handleDeleteComment}>
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

export default DashComments
