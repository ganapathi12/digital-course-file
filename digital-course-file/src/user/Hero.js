import React, { useState, Component } from 'react'
import AddFolder from './AddFolder'
import AddFile from './AddFile'
import { Container, Navbar, Nav,Row,Col } from 'react-bootstrap'
import { useFolder } from '.././hooks/useFolder'
import Folder from './Folder'
import FolderNav from './FolderNav'
import Deffolders from './Deffolders'
import Sharelink from './Sharelink'
import Deletefolder from './Deletefolder'
import { useParams, useLocation } from 'react-router-dom'
import File from './File'
import 'firebase/storage'
import Loader from 'react-loader-spinner'
import Dropzone from './Dropzone'
import ParticlesBg from 'particles-bg'
import Sidebar from './Sidebar'

const Hero = ({ handleLogout }) => {
  const { folderId } = useParams()
  const state = {}

  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)

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
        <ParticlesBg type='cobweb' bg={true} />
        <Container fluid>
          <Row >
            <Col xl={3} lg={4} xs={3} sm={3} md={5} style={{marginLeft : '-15px'}}><Sidebar/></Col>
            <Col > 
          <Container fluid style={{marginLeft : '-45px'}}>
              <div className='d-flex align-items-center '>
                <FolderNav currentFolder={folder} />
                <AddFolder currentFolder={folder} />
                {childFolders.length == 0 &&
                  folder.parentId == null &&
                  folder.id != null && <Deffolders currentFolder={folder} />}
                {folder.id != null && <Sharelink currentFolder={folder} />}
                {folder.id != null && <Deletefolder currentFolder={folder} />}
                {folder.id != null && <AddFile currentFolder={folder} />}
                {folder.id != null && <Dropzone currentFolder={folder} />}
              </div>

              {childFolders.length > 0 && (
                <div className='d-flex flex-wrap'>
                  {childFolders.map((childFolder) => (
                    <div
                      key={childFolder.id}
                      style={{ maxWidth: '250px' }}
                      className='p-2'
                    >
                      <Folder folder={childFolder}></Folder>
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
                      <File file={childFile} />
                      <div id='root'></div>
                    </div>
                  ))}
                </div>
              )}
                           </Container>

               </Col>
               </Row> 
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

export default Hero
