import React,{useState} from "react";
import "./style.css";
import Post from './components/Post'

export default function App() {
  
  const [posts,setPosts]=useState([
    {username:"Pranav Bakale",
    caption:"hello world",
    imageUrl:"https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebase/master/Instagram-name-logo-transparent-PNG.png"},
    {username:"Aadesh Bakale",
    caption:"Hello people",
    imageUrl:"https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebase/master/Instagram-name-logo-transparent-PNG.png"}
  ])

  return(
    <div className='app'>
      <div className='appHeader'>
        <img className='appHeaderImg'
        src="https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebase/master/Instagram-name-logo-transparent-PNG.png" height="70px" width="100px"/>
      </div>
      {posts.map(post=>(
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
      ))}
       
       
    </div>
  );
}
