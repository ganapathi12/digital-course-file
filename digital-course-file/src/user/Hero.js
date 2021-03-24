import React from 'react'
import AddFolder from './AddFolder'
import AddFile from './AddFile'
import { Container, Button, Navbar, Nav } from 'react-bootstrap'
import { useFolder } from '.././hooks/useFolder'
import Folder from './Folder'
import FolderNav from './FolderNav'
import Deffolders from './Deffolders'
import { useParams,useLocation } from 'react-router-dom'
import copyright from './copyright' 
import { Link } from 'react-router-dom'
import File from 'C:/Users/Dell/Desktop/try/digital-course-file/digital-course-file/src/user/File'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import firebase from "../fire";

const Hero = ({ handleLogout }) => {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)
  
  return (
    <>
      <section className='hero'>
        <nav>
          <Navbar.Brand as={Link} to='/'>
            <h2>Course File System</h2>
          </Navbar.Brand>

          <button className='logoutbutton' onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </section>

      <Container fluid>
        <div className='d-flex align-items-center'>
          <FolderNav currentFolder={folder} />
          <AddFolder currentFolder={folder} />
          <AddFile currentFolder={folder}/>
          {childFolders.length == 0 && <Deffolders currentFolder={folder} />}
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
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={childFile} />
                
              </div>
            ))}
          </div>
        )}
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
}
export default Hero
