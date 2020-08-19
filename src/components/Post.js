import React from 'react'
import  '../Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({username,caption,imageUrl}){
  return(
    <div className="post">
    <div className='postHeader'>
      <Avatar className='postAvatar' alt="Pranav" src="">P</Avatar>
      <h3>{username}</h3>
    </div>
       {/*header = profile pic + username */}

       {/*img */}
      <img  className='postImg' src={imageUrl}/>

      <h4 className='postText'><strong>{username}</strong> {caption}</h4>
       {/*username+captions */}

    </div>
  )
}

export default Post