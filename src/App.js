import React from "react";
import "./style.css";
import Post from './components/Post'

export default function App() {
  return(
    <div className='app'>
      <div className='appHeader'>
        <img className='appHeaderImg'
        src="https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebase/master/Instagram-name-logo-transparent-PNG.png" height="70px" width="100px"/>
      </div>
       <Post username="Pranav Bakale" imageUrl="https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebase/master/Instagram-name-logo-transparent-PNG.png" caption="Hello React"/>
       <Post/>
       <Post/>
       <Post/>
    </div>
  );
}
