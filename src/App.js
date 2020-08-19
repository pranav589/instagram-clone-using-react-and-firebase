import React,{useState,useEffect} from "react";
import "./style.css";
import Post from './components/Post'
import {db} from './firebase'
import {Modal} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Button,Input} from '@material-ui/core'

function getModalStyle() {
  const top = 50 
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes=useStyles()
  const [modalStyle]=useState(getModalStyle)
  const [posts,setPosts]=useState([
  ])
  const [open,setOpen]=useState(false)
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')

  useEffect(()=>{
     db.collection('posts').onSnapshot(snapshot=>{
       setPosts(snapshot.docs.map(doc=>({post:doc.data(),id:doc.id})))
     })
  },[])

  const signUp=(e)=>{

  }
  

  return(
    <div className='app'>
    <Modal
    open={open}
    onClose={()=>setOpen(false)} >
    <div style={modalStyle} className={classes.paper}>
    <form className="appSignup">
     <center>
      <img className='appHeaderImg' src="https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebase/master/Instagram-name-logo-transparent-PNG.png" height="70px" width="100px"/>

      <Input placeholder="username" type="text" value={username} onChange={e=>setUsername(e.target.value)}/>

      <Input placeholder='email' type='text' value={email} onChange={e=>setEmail(e.target.value)}/>

      <Input placeholder='password' value={password} type="password" onChange={e=>setPassword(e.target.value)}/>

      <Button onClick={signUp}>Sign Up</Button>
    </center>
    </form>
    </div>
    </Modal>
      <div className='appHeader'>
        <img className='appHeaderImg'
         src="https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebase/master/Instagram-name-logo-transparent-PNG.png" height="70px" width="100px"/>
      </div>
      <Button onClick={()=>setOpen(true)}>Sign Up</Button>
      {posts.map(({post,id})=>(
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} key={id}/>
      ))}
       
       
    </div>
  );
}

export default App
