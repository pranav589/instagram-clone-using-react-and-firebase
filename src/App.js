import React,{useState,useEffect} from "react";
import "./style.css";
import Post from './components/Post'
import {db,auth} from './firebase'
import {Modal} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Button,Input} from '@material-ui/core'
import ImageUpload from './components/ImageUpload'

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
  const [user,setUser]=useState(null)
  const [openSignin,setOpenSignin]=useState(false)
  
 
  useEffect(()=>{
     const unsubscribe=auth.onAuthStateChanged((authUser)=>{
       if(authUser){
          //if the user has logged in
          console.log(authUser)
          setUser(authUser)
        }else{
         //if the user has logged out
         setUser(null)
       }
     })

     return ()=>{
       //performs cleanup actions to avoid duplicates
       unsubscribe()
     }
  },[user,username])

  useEffect(()=>{
    //this is code fires when app.js loads
     db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
       //every time a change in the post (add/remove) happens, this code fires
       setPosts(snapshot.docs.map(doc=>({post:doc.data(),id:doc.id})))
     })
  },[])

  const signUp=(e)=>{
      e.preventDefault()
      auth.createUserWithEmailAndPassword(email,password).then((authUser)=>{
        return authUser.user.updateProfile({
          displayName:username
        })
      }).catch(error=>alert(error.message))
      setOpen(false)
  }
  

  const signIn=(e)=>{
    e.preventDefault()
    auth.signInWithEmailAndPassword(email,password).catch(error=>alert(error.message))
    setOpenSignin(false)
  }

  return(
    <div className='app'>
    {/*{user && user.displayName ? (  <ImageUpload username={user.displayName}/>):(<h3>Please login to upload your photo</h3>)}*/}

    <Modal
    open={open}
    onClose={()=>setOpen(false)} >
    <div style={modalStyle} className={classes.paper}>
    <form className="appSignup">
     <center>
     <img className='appHeaderImg' src="https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebanse/master/Instagram-name-logo-transparent-PNG.png" height="70px" width="100px"/><br/>

      <Input placeholder="username" type="text" value={username} onChange={e=>setUsername(e.target.value)}/>

      <Input placeholder='email' type='text' value={email} onChange={e=>setEmail(e.target.value)}/>

      <Input placeholder='password' value={password} type="password" onChange={e=>setPassword(e.target.value)} style={{}}/><br/>

      <Button onClick={signUp} type='submit'>Sign Up</Button>
    </center>
    </form>
    </div>
    </Modal>

      <Modal open={openSignin} onClose={()=>setOpenSignin(false)}>
        <div style={modalStyle} className={classes.paper}>
           <form className="appSignup">
             <center>
               <img src="https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebase/master/Instagram-name-logo-transparent-PNG.png" height="70px" width="100px"/><br/>

               <Input placeholder="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

               <Input placeholder='password' type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/>

               <Button type='submit' onClick={signIn}>Sign In</Button>

             </center>
           </form>
        </div>
      
      </Modal>
      <div className='appHeader'>
        <img className='appHeaderImg'
         src="https://stackblitz.com/files/instagram-clone-using-react-and-firebase/github/pranav589/instagram-clone-using-react-and-firebase/master/Instagram-name-logo-transparent-PNG.png" height="70px" width="100px"/>
      
      {user ? (<Button onClick={()=>auth.signOut()}>Logout</Button>):(
      <div className='loginContainer'>
          <Button onClick={()=>setOpenSignin(true)}>Sign In</Button>
          <Button onClick={()=>setOpen(true)}>Sign Up</Button>
      </div>)}
      </div>
     {/*{user && user.displayName ? <ImageUpload username={user.displayName}/> : <h3>Login to upload</h3>}*/}
    <div className="appPosts">
      {posts.map(({post,id})=>(
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} key={id} postId={id} user={user}/>
      ))}
    </div>
      {user && user.displayName ? <ImageUpload username={user.displayName}/> : <h3>Login to upload</h3>}
        
       
    </div>
  );
}

export default App
