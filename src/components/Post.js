import React,{useState,useEffect} from 'react'
import  '../Post.css'
import {db} from '../firebase'
import Avatar from '@material-ui/core/Avatar'
import firebase from 'firebase'


function Post({username,caption,imageUrl,postId,user}){
  const [comments,setComments]=useState([])
  const [comment,setComment]=useState('')


  useEffect(()=>{
    let unsubscribe;
    if(postId){
      unsubscribe=db.collection("posts").doc(postId).collection("comments").orderBy("timestamp","desc").onSnapshot(snapshot=>{
        setComments(snapshot.docs.map(doc=>doc.data()))
      })
    }
    return ()=>{
      unsubscribe()
    }
  },[postId])
 
  const postComment=(e)=>{
      e.preventDefault()
      db.collection("posts").doc(postId).collection("comments").add({
        text:comment,
        username:user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      });
      setComment("")
  }



  return(
    <div className="post">
    <div className='postHeader'>
      <div className="postName">
      <Avatar className='postAvatar' alt="Pranav" src="">P</Avatar>
      <h3>{username}</h3>
      </div>
      <button onClick={e=>db.collection('posts').doc(postId).delete()}>Delete</button>
    </div>
       {/*header = profile pic + username */}
      
       {/*img */}
      <img  className='postImg' src={imageUrl}/>

      <h4 className='postText'><strong>{username}</strong> {caption}</h4>
       {/*username+captions */}
      
      {/*comments */}
     <div className="post_comments">
         {comments.map(comment=>(
           <p>
             <strong>{comment.username}</strong> {comment.text}
           </p>
         ))}
     </div>
   {user && (
      <form className="post_commentbox">
         <input type="text" value={comment} className="post_input" onChange={e=>setComment(e.target.value)} placeholder="Comment here..."/>
      

     <button className="post_button" disabled={!comment} type="submit" onClick={postComment}>
     Post
     </button>
     </form>
   )}
   </div>
  )
}

export default Post