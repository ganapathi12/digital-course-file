import {React,useState,Fragment } from 'react'
import ReactDOM from 'react-dom'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { storage, database } from '../fire.js'
import { ROOT_FOLDER } from '../hooks/useFolder'
import { v4 as uuidV4 } from 'uuid'
import { ProgressBar, Toast } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip';
import firebase from 'firebase'

export default function AddFile({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([])
  const divStyle = {
    fontWeight: 'bold',
    color: 'black'
  };
  function handleUpload(e) {
    const file = e.target.files[0]
    if (currentFolder == null || file == null) return

    const id = uuidV4()
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ])
    const uniqueid = uuidV4()

    const uploadTask = storage
      .ref(`/files/${firebase.auth().currentUser.uid}/${uniqueid}`)
      .put(file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress }
            }

            return uploadFile
          })
        })
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true }
            }
            return uploadFile
          })
        })
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadFile) => {
            return uploadFile.id !== id
          })
        })

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where('name', '==', file.name)
            .where('userId', '==', firebase.auth().currentUser.uid)
            .where('folderId', '==', currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0]
              if (existingFile) {
                existingFile.ref.update({ url: url })
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  uniqueid: uniqueid,
                  createdAt: database.getTime(),
                  folderId: currentFolder.id,
                  userId: firebase.auth().currentUser.uid,
                })
              }
            })
        })
      }
    )
  }

  return (
    <Fragment>
        <label className='btn btn-outline-success m-0 mr-2' data-tip data-for='uploadfile'>        
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          name='upload'
          type='file'
          onChange={handleUpload}
          style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              bottom: '4rem',
              right: '2rem',
              maxWidth: '250px',
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles((prevUploadingFiles) => {
                    return prevUploadingFiles.filter((uploadFile) => {
                      return uploadFile.id !== file.id
                    })
                  })
                }}
              >
                <Toast.Header
                  closeButton={file.error}
                  className='text-truncate w-100 d-block'
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? 'danger' : 'primary'}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? 'Error'
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}

      <ReactTooltip id='uploadfile' type='success' place='bottom' effect='solid'>
            <span style={divStyle}>Upload File</span>
      </ReactTooltip>
    </Fragment>
  )
}
