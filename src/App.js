import React,{useState,useEffect} from "react";
import "./style.css";
import Post from './components/Post'
import {db} from './firebase'

export default function App() {
  
  const [posts,setPosts]=useState([
  ])

  useEffect(()=>{
     db.collection('posts').onSnapshot(snapshot=>{
       setPosts(snapshot.docs.map(doc=>({post:doc.data(),id:doc.id})))
     })
  },[])

  return(
    <div className='app'>
      <div className='appHeader'>
        <img className='appHeaderImg'
         src="https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebase/master/Instagram-name-logo-transparent-PNG.png" height="70px" width="100px"/>
      </div>
      {posts.map(({post,id})=>(
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} key={id}/>
      ))}
       
       
    </div>
  );
}
