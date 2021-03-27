import React, { useState, Component } from "react"
import AddFolder from './AddFolder'
import AddFile from './AddFile'
import { Container, Button, Navbar, Nav } from 'react-bootstrap'
import { useFolder } from '.././hooks/useFolder'
import Folder from './Folder'
import FolderNav from './FolderNav'
import Deffolders from './Deffolders'
import Sharelink from './Sharelink'
import Deletefolder from './Deletefolder'
import { useParams,useLocation } from 'react-router-dom' 
import { Link } from 'react-router-dom'
import File from './File'
import 'firebase/storage';
import ReactDOM from "react-dom"
import firebase from "../fire";
import Loader from 'react-loader-spinner'

const Hero = ({ handleLogout }) => {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
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

  return (
    <>
      <Container fluid>
        <div className='d-flex align-items-center'>
          <FolderNav currentFolder={folder} />
          <AddFolder currentFolder={folder} />
          
          {childFolders.length == 0 && folder.parentId == null && folder.id!=null &&  (
            <Deffolders currentFolder={folder} />
          )}
          {folder.id!=null &&  ( <Sharelink currentFolder={folder} /> )}
          {folder.id!=null &&  ( <Deletefolder currentFolder={folder} /> )}
          {folder.id!=null &&  ( <AddFile currentFolder={folder} /> )}
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
                <div id="root">
                  
                </div>
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
class ContextMenu extends React.Component {
  state = {
      visible: false,
  };
  
  componentDidMount() {
      document.addEventListener('contextmenu', this._handleContextMenu);
      document.addEventListener('click', this._handleClick);
      document.addEventListener('scroll', this._handleScroll);
  };

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this._handleContextMenu);
    document.removeEventListener('click', this._handleClick);
    document.removeEventListener('scroll', this._handleScroll);
  }
  
  _handleContextMenu = (event) => {
      event.preventDefault();
      
      this.setState({ visible: true });
      
      const clickX = event.clientX;
      const clickY = event.clientY;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const rootW = this.root.offsetWidth;
      const rootH = this.root.offsetHeight;
      
      const right = (screenW - clickX) > rootW;
      const left = !right;
      const top = (screenH - clickY) > rootH;
      const bottom = !top;
      
      if (right) {
          this.root.style.left = `${clickX + 5}px`;
      }
      
      if (left) {
          this.root.style.left = `${clickX - rootW - 5}px`;
      }
      
      if (top) {
          this.root.style.top = `${clickY + 5}px`;
      }
      
      if (bottom) {
          this.root.style.top = `${clickY - rootH - 5}px`;
      }
  };

  _handleClick = (event) => {
      const { visible } = this.state;
      const wasOutside = !(event.target.contains === this.root);
      
      if (wasOutside && visible) this.setState({ visible: false, });
  };

  _handleScroll = () => {
      const { visible } = this.state;
      
      if (visible) this.setState({ visible: false, });
  };
  
  render() {
      const { visible } = this.state;
      
      return(visible || null) && 
          <div ref={ref => {this.root = ref}} className="contextMenu">
              <div className="contextMenu--option">Delete</div>
              
          </div>
  };
}
ReactDOM.render(<ContextMenu/>, document.getElementById('root'));
export default Hero
