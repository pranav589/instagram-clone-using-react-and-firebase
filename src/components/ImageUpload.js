import React,{useState} from 'react'
import {Button} from '@material-ui/core'
import {storage,db} from '../firebase'
import db from '../firebase'
import firrbase from 'firebase'

function ImageUpload({username}){
  const [caption,setCaption]=useState('')
  const [image,setImage]=useState(null)
  const [progress,setProgress]=useState(0)

 {/*get the first file which is selected */}
  const handleChange=(event)=>{
    if(event.target.files[0]){
      setImage(event.target.files[0])
    }
    
  }

  const handleUpload=()=>{ 
    const uploadTask=storage.ref(`images/${image.name}`).put(image)

    uploadTask.on('state_changed',(snapshot)=>{
      const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
      setProgress(progress)
    },(err)=>{
      console.log(err)
      alert(err.message)
    },()=>{
     storage.ref("images").child(image.name).getDownloadURL().then(url=>{console.log(url)
       db.collection("posts").push({
         caption:caption,
         username:username,
         imageUrl:url,
         timestamp:firebase.firestore.FieldValue.serverTimestamp()
         
       })
       
       
       setProgress(0)
       setCaption('')
       setImage(null)
     })
    })
  }

  return(
     <div>
    <progress value={progress} max="100"/>
        {/*  caption input */}
        <input type='text' placeholder="write your captions here..." value={caption} onChange={event=>setCaption(event.target.value)}/>

        {/* file upload*/}
         <input type='file' onChange={handleChange}/>
        {/* button */}
        <Button onClick={handleUpload}>Upload</Button>

     </div>
  )
}

export default ImageUpload