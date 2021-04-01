import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalFooter } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandRock } from '@fortawesome/free-solid-svg-icons'
import { database } from '../fire.js'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidV4 } from 'uuid'
import { ProgressBar, Toast } from 'react-bootstrap'
import { storage } from '../fire.js'
import { ROOT_FOLDER } from '../hooks/useFolder'
import ReactDOM from 'react-dom'

// {currentFolder}
export default function Dropzone({ currentFolder }) {
  const [open, setOpen] = useState(false)
  const temp_parent = '' + currentFolder.parentId
  const [path, setpath] = useState(``)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const [uploadingFiles, setUploadingFiles] = useState([])

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  function openModal() {
    {
      temp_parent != 'null' && setpath(`/folder/${temp_parent}`)
    }
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
    acceptedFiles.length = 0
  }

  function uploadinghelp() {
    const files = acceptedFiles.map((file) => handleUpload(file))
    closeModal()
    return
  }

  function handleUpload(file) {
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
                  uniqueid:uniqueid,
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
    <>
      <Button
        name='drag-and-drop'
        style={{ maxWidth: '80px' }}
        className='mr-2'
        onClick={openModal}
        variant='warning'
        size='sm'
      >
        <FontAwesomeIcon icon={faHandRock} />
      </Button>
      <Modal
        show={open}
        onHide={closeModal}
        size='xl'
        aria-labelledby='example-custom-modal-styling-title'
        centered
        dialogClassName='modal-90w'
      >
        <Modal.Body>
          {/* <div>
                  Drag and Drop files Here!!  
              </div> */}

          <section className='container'>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <ul>{files}</ul>
            </aside>
          </section>
        </Modal.Body>
        <ModalFooter>
          <Button
            name='del_confirm'
            style={{ float: 'left' }}
            className='mr-2'
            variant='primary'
            onClick={uploadinghelp}
            as={Link}
          >
            Done
          </Button>
          <Button
            style={{ maxWidth: '80px' }}
            className='mr-2'
            variant='danger'
            onClick={closeModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
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
    </>
  )
}
