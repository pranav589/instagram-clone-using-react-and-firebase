import firebase from 'firebase'




export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAPM8t1HXvHQbFS01SfqtkQPd-PRz_neTc",
  authDomain: "instagram-clone-react-fi-e94f1.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-fi-e94f1.firebaseio.com",
  projectId: "instagram-clone-react-fi-e94f1",
  storageBucket: "instagram-clone-react-fi-e94f1.appspot.com",
  messagingSenderId: "862231955034",
  appId: "1:862231955034:web:934db9993886a8546b3a63",
  measurementId: "G-CD5RY43TXE"
});

export const db=firebaseApp.firestore()

export const auth=firebase.auth()

export const storage=firebase.storage()



