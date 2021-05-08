import React, { useState, Component } from 'react'
import AddFolder from './AddFolder'
import AddFile from './AddFile'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useAssignment } from '.././hooks/useAssignment'
import Assg_folder from './Assg_folder'
import Assg_nav from './Assg_nav'
import { useParams, useLocation } from 'react-router-dom'
import 'firebase/storage'
import Loader from 'react-loader-spinner'
import Dropzone from './Dropzone'
import ParticlesBg from 'particles-bg'
import Assg_file from './Assg_file'

const Assignments = () => {
  const { folderId } = useParams()
  const { state = {} } = useLocation()

  const { folder, childFolders, childFiles } = useAssignment(
    folderId,
    state.folder
  )

  if (!folder) {
    return (
      <>
        <div className='centered'>
          <Loader
            type='Puff'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      </>
    )
  }
  if (folder.id !== 'copyright') {
    return (
      <>
        
        <Assg_nav currentFolder={folder} />

        {/* <Sidebar/> */}
        <Container fluid >
          <ParticlesBg type='cobweb' bg={true} />
          {/* <main  className='col-md-9 col-xl-8 py-md-3 pl-md-5'> */}
          {childFolders.length > 0 && (
            <div className='d-flex flex-wrap'>
              {childFolders.map((childFolder) => (
                <div
                  key={childFolder.id}
                  style={{ maxWidth: '250px' }}
                  className='p-2'
                >
                  <Assg_folder folder={childFolder}></Assg_folder>
                </div>
              ))}
            </div>
          )}

          {childFolders.length > 0 && childFiles.length > 0 && <hr />}
          {childFiles.length > 0 && (
            <div className='d-flex flex-wrap'>
              {childFiles.map((childFile) => (
                <div
                  key={childFile.id}
                  style={{ maxWidth: '250px' }}
                  className='p-2'
                >
                  <Assg_file file={childFile} />
                  <div id='root'></div>
                </div>
              ))}
            </div>
          )}
          {/* </main> */}
        </Container>
        <Navbar fixed='bottom' variant='light' bg='light'>
          <Container className='ml-sm-2'>
            <Nav.Link eventKey={2} href='copyright'>
              &copy; Digital Course File Group 2
            </Nav.Link>
          </Container>
        </Navbar>


      </>
    )
  } else {
    return null
  }
}

export default Assignments;
