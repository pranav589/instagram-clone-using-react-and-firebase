import React, {useState} from 'react'
import { Button,Input } from '@material-ui/core'
import { storage, db } from '../firebase'
import firebase from 'firebase'
import '../imageUpload.css'

function ImageUpload({username}) {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)

    const handleChange = (e) => {
        if(e.target.files[0]) setImage(e.target.files[0])
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred /snapshot.totalBytes) * 100 
                )
                setProgress(progress)
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        })
                    });

                    setProgress(0)
                    setCaption('')
                    setImage(null)
            }
        )
    }

    return (
        <div className="imageupload">
            <progress className="imageupload_progress" value={progress} max="100" />
            <Input type="text" value={caption} placeholder="Enter a caption..." onChange={e => setCaption(e.target.value)} className="input" />
            <input type="file" onChange={handleChange} className="inputFile"/>
            <Button onClick={handleUpload} disabled={!caption}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload