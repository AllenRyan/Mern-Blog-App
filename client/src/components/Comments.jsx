import { useEffect, useState } from 'react'
import moment from 'moment';

function Comments({comment}) {
    const [user, setUser] = useState({})
    useEffect(() => {
       const getUser = async () => {
        try {
            const res = await fetch(`/api/user/${comment.userId}`);
            const data = await res.json();
            if(res.ok){
            setUser(data)
            }
        } catch (error) {
            console.log(error.message)
        }
       }
       getUser();
    },[comment])
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        {/* div for image */}
      <div className='flex-shrink-0 mr-3'>
        <img className='h-10 w-10 object-cover rounded-full bg-gray-200' src={user.profilePic} alt={user.username} />
      </div>
      {/* div for user info */}
      <div className='flex-1'>
        {/* div for username */}
        <div className='flex items-center mb-1'>
            <span className='font-bold mr-1 text-xs truncate '>{user ? `@${user.username}` : 'anonymous user'}</span>
            <span className='text-gray-500 text-xs'>
                {moment(comment.createAt).fromNow()}
            </span>
        </div>
        <p className='text-gray-500 pb-2'>{comment.content}</p>
      </div>
    </div>
  )
}

export default Comments
