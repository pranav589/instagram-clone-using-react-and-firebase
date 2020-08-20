import React,{useState} from 'react'
import {Button} from '@material-ui/core'
import {storage,db} from '../firebase'

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
    {/*pushing the img to firebase storage*/}
     const uploadTask=storage.ref(`images/${image.name}`).put(image)

     uploadTask.on('state_changed',(snapshot)=>{
       //the progress bar functiom
       const progress=Math.round((snapshot.bytesTranferred/snapshot.totalBytes)*100)

       setProgress(progress)
     },
     (error)=>{
       {/*errr function */}
       console.log(error)
       alert(error.message)
     },
     ()=>{
       {/*complete function comes here */}
       {/*getting the download url from firebase storage */}
       storage.ref('images').child(image.name).getDownloadURL().then(url=>{
         db.collection('posts').add({
           timestamp:firebase.firestore.FieldValue.serverTimestamp(),
           caption:caption,
           imageUrl:url,
           username:username
         })

         setProgress(0)
         setCaption('')
         setImage(null)
       })
     }
     
     )
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