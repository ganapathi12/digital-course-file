import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { React, useState,Fragment } from 'react'
import { storage, storageRef, firestore1, database } from '../fire.js'
import Axios from 'axios'
import fileDownload from 'js-file-download'
import { Button, Modal, Form } from 'react-bootstrap'
import { useContextMenu, Menu, Item } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'
import firebase from 'firebase'

export default function File({ file }) {
  const [showit, setShowit] = useState(false)
  const MENU_ID = '#asvdsdv/asqrca662'
  const [fname, setFname] = useState(file.name)
  const [show1, setshow1] = useState(false)
  const [show2, setshow2] = useState(false)
  const [fileurl, setfileURL] = useState('')
  const [fileid, setfileid] = useState('')
  const [uploaddetail, setuploadDetail] = useState('')
  const db = firebase.firestore()
  const [uniqueid1, setuniqueid1] = useState('')
  const { show } = useContextMenu({
    id: MENU_ID,
  })

  function closeModal() {
    setShowit(false)
    setshow1(false)
    setshow2(false)
  }
  function displayMenu(e) {
    show(e, {
      props: {
        id: Number(e.currentTarget.id),
        fileURL: file.url,
        fileName: file.name,
        showit: showit,
        details: file.createdAt,
        fileuniqueID: file.uniqueid,
        fileID: file.id,
      },
    })
  }

  function handleItemClick({ event, props, file }) {
    switch (event.currentTarget.id) {
      case 'download':
        // Getting download url of the file and converting it as data to blob using axios and then downloading it
        var httpsReference = storage.refFromURL(props.fileURL)
        httpsReference
          .getDownloadURL()
          .then((url) => {
            Axios.get(url, {
              responseType: 'blob',
            }).then((res) => {
              fileDownload(res.data, props.fileName)
            })
          })
          .catch((error) => {
            console.log('ERROR')
          })
        break

      case 'details':
        setShowit(true)
        setFname(props.fileName)
        setuploadDetail(Date(props.details.toMillis()))
        break

      case 'delete':
        setshow1(true)
        setuniqueid1(props.fileuniqueID)
        setfileid(props.fileid)
        break
    }
  }

  function handleDelete({ props }) {
    const storageRef = firebase.storage().ref()

    var path = 'files/' + firebase.auth().currentUser.uid + '/' + uniqueid1
    console.log(path)
    var desertRef1 = storageRef.child(path)
    desertRef1.delete()

    database.files
      .doc(file.id)
      .delete()
      .then(() => {
        console.log('Folder deleted')
      })
      .catch((error) => {
        console.error('Error :', error)
      })

    closeModal()
  }

  return (
    <Fragment>
    <div id='root'>
      <a
        onContextMenu={displayMenu}
        href={file.url}
        target='_blank'
        className='btn btn-outline-dark text-truncate w-100'
      >
        <FontAwesomeIcon icon={faFile} className='mr-2' />
        {file.name}
      </a>

      {/* CONTEXT MENU FOR FILE */}
      <Menu id={MENU_ID}>
        <Item id='download' onClick={handleItemClick}>
          Download
        </Item>
        <Item id='details' onClick={handleItemClick}>
          Details
        </Item>
        <Item id='delete' onClick={handleItemClick}>
          Delete
        </Item>
      </Menu>

      {/* FOR SHOWING DETAILS OF THE FILE */}
      <Modal show={showit} onHide={closeModal}>
        <Modal.Body>
          <p>File : {fname}</p>
          <p>Uploaded On : {('' + uploaddetail).substring(0, 34) + '(IST)'}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={closeModal}>
        <Form>
          <Modal.Body>
            <div>Do you want to delete the current file?</div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              name='del_confirm'
              style={{ float: 'left' }}
              className='mr-2'
              variant='danger'
              onClick={handleDelete}
            >
              DELETE
            </Button>
            <Button variant='primary' onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
    </Fragment>
  )
}
