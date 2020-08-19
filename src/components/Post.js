import React from 'react'
import  '../Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post(){
  return(
    <div className="post">
    <div className='postHeader'>
      <Avatar className='postAvatar' alt="Pranav" src="">P</Avatar>
      <h3>Username</h3>
    </div>
       {/*header = profile pic + username */}

       {/*img */}
      <img  className='postImg' src="https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebase/master/Instagram-name-logo-transparent-PNG.png"/>

      <h4 className='postText'><strong>Username:</strong> captions</h4>
       {/*username+captions */}

    </div>
  )
}

export default Post