import React,{useState,useEffect} from 'react'
import  '../Post.css'
import {db} from '../firebase'
import Avatar from '@material-ui/core/Avatar'
import firebase from 'firebase'
import {Button,Modal,Input,Button} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"

const useStyles=makeStyles((theme)=>({
  paper:{
    position:"absolute",
    width:400,
    backgroundColor:theme.palette.background.paper,
    border:"2px solid #000",
    boxShadow:theme.shadows[5],
    padding:theme.spacing(2,4,3)
  }
}))

function Post({username,caption,imageUrl,postId,user}){
  const classes=useStyles()
  const [comments,setComments]=useState([])
  const [comment,setComment]=useState('')
  const[open,setOpen]=useState(false)
  const[input,setInput]=useState("")


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

 const handleOpen=()=>{
   setOpen(true)
 }


 const updateCaption=()=>{
   db.collection("posts").doc(postId).set({
     caption:input
   },{merge:true})
   setOpen(false)
 }

  return(
    <>
    <Modal open={open} onClose={e=>setOpen(false)} style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
    <div className={classes.paper} style={{textAlign:"center"}}>
      <Input value={input} placeholder="Update your caption" onChange={e=>setInput(e.target.value)}/>
      <Button onClick={updateCaption}>Update</Button>
      </div>
      </Modal>
    <div className="post">
    <div className='postHeader'>
      <div className="postName">
      <Avatar className='postAvatar' alt="Pranav" src="">P</Avatar>
      <h3>{username}</h3>
      </div>

     {(user && user.displayName===username) ?(<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <button style={{border:"0",outline:"0",backgroundColor:"transparent"}} onClick={e=>db.collection('posts').doc(postId).delete()}>Delete</button>
      <button  style={{border:"0",outline:"0",backgroundColor:"transparent"}} onClick={e=>setOpen(true)}>Edit</button>
      </div>) : (null)}
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
   </>
  )
}

export default Post