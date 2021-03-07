import React, { useEffect, useState } from 'react'
import AddFolder from './AddFolder'
import { Container, Button, Navbar, Nav } from 'react-bootstrap'
import { useFolder } from '.././hooks/useFolder'
import Folder from './Folder'
import FolderNav from './FolderNav'
import Deffolders from './Deffolders'
import { useParams } from 'react-router-dom'
import copyright from './copyright'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

const Hero = ({ handleLogout }) => {
  const { folderId } = useParams()
  const { folder, childFolders } = useFolder(folderId)

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

  return (
    <>
      <Container fluid>
        <div className='d-flex align-items-center'>
          <FolderNav currentFolder={folder} />
          <AddFolder currentFolder={folder} />
          {childFolders.length == 0 && folder.id != null && (
            <Deffolders currentFolder={folder} />
          )}
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
    </>
  )
}
export default Hero
