import React,{useState,useEffect} from 'react'
import  '../Post.css'
import {db} from '../firebase'
import Avatar from '@material-ui/core/Avatar'

function Post({username,caption,imageUrl,postId}){
  const [comments,setComments]=useState([])
  useEffect(()=>{
    let unsubscribe;
    if(postId){
      unsubscribe=db.collection("posts").doc(postId).collection("comments").onSnapshot(snapshot=>{
        setComments(snapshot.docs.map(doc=>doc.data()))
      })
    }
    return ()=>{
      unsubscribe()
    }
  },[postId])
 
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