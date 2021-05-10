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

export default function Assg_file({ file }) {
  const [showit, setShowit] = useState(false)
  const MENU_ID = '#asvdsdv/as9298194qrca662'
  const [fname, setFname] = useState(file.name)
  const [show1, setshow1] = useState(false)
  const [folderid, setfolderid] = useState('')
  const [fileID, setfileID] = useState('')
  const [uploaddetail, setuploadDetail] = useState('')
  const [uniqueid1, setuniqueid1] = useState('')
  const [stud_name,setStud_name]= useState('')
  const [stud_Lname,setStud_Lname]= useState('')
  const [stud_rno,setStud_rno]= useState('')
  const [stud_id,setStud_id]= useState('')
  const [stud_dep,setStud_dep]= useState('')
  const [stud_sec,setStud_sec]= useState('')


  const { show } = useContextMenu({
    id: MENU_ID,
  })

  function closeModal() {
    setshow1(false)
    setShowit(false)
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
        folderID: file.folderId,
        sid : file.Sid,
      },
    })
  }

  function handleItemClick({ event, props }) {
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
                setFname(props.fileName)
                setuploadDetail(props.details.toDate())
                setfileID(props.fileID)
                database.s_details.where("sid", "==", props.sid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc1) => {
                        setStud_name(doc1.data().fname)
                        setStud_rno(doc1.data().rollno)
                        setStud_Lname(doc1.data().lname)
                        setStud_dep(doc1.data().dept)
                        setStud_sec(doc1.data().sec)
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
                setShowit(true)
                break


              case 'delete':
                setshow1(true)
                setuniqueid1(props.fileuniqueID)
                setfileID(props.fileID)
                setfolderid(props.folderID)
                setStud_id(props.sid)
                break
        }
      }

  function handleDelete({ props }) {
    
    const storageRef = firebase.storage().ref()
    var path = 'a_files/' + folderid + '/' + uniqueid1
    var fileref = storageRef.child(path)
    fileref.delete()

    database.a_files
      .doc(fileID)
      .delete()
      .then(() => {
        console.log('File deleted')
      })
      .catch((error) => {
        console.error('Error :', error)
      })

      database.s_details.where("sid", "==", stud_id)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc1) => {
              doc1.ref.delete()
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

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
          <h2 align="center">File Upload details</h2>
          <br></br>
          <p><b>Student Name</b> : {stud_name} {stud_Lname}</p>
          <p><b>Roll Number</b>  : {stud_rno}</p>
          <p> <b>Department</b>  : {stud_dep} - {stud_sec}</p>
          <p><b>Uploaded On</b>  : {('' + uploaddetail).substring(0, 25) + '(IST)'}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

       {/* DELETION CONFIRMATION */}     
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
              Delete
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
