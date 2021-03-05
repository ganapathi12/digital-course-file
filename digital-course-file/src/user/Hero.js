import React from 'react'
import AddFolder from './AddFolder'
import { Container, Button, Navbar, Nav } from 'react-bootstrap'
import { useFolder } from '.././hooks/useFolder'
import Folder from './Folder'
import FolderNav from './FolderNav'
import Deffolders from './Deffolders'
import { useParams } from 'react-router-dom'
import copyright from './copyright'

const Hero = ({ handleLogout }) => {
  const { folderId } = useParams()
  const { folder, childFolders } = useFolder(folderId)

  return (
    <>
      <section className='hero'>
        <nav>
          <h2>Course File System</h2>
          <button className='logoutbutton' onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </section>

      <Container fluid>
        <div className='d-flex align-items-center'>
          <FolderNav currentFolder={folder} />
          <AddFolder currentFolder={folder} />
          {(childFolders.length == 0 ) && (<Deffolders currentFolder={folder} />) }
          
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
