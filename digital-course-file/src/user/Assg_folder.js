import { React,useState,Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { Button,Modal,Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { database } from '../fire.js'
import firebase from 'firebase'
import { faLink, faPaste } from '@fortawesome/free-solid-svg-icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useContextMenu, Menu, Item, Separator } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

export default function Assg_folder({folder}) {
    const MENU_ID = "#aadswfed299dfsdwqwdasc29";
    const history = useHistory();

    const [showit, setShowit] = useState(false);
    const [showit1, setShowit1] = useState(false);
    const [showit2, setShowit2] = useState(false);
    const [fname,setFname] = useState(folder.name);
    const [fid,setFid] = useState(folder.id);
    const [fdate,setFdate] = useState('');
    const [fdesp,setFdesp] = useState('');
    const [uploaddetail,setuploadDetail] = useState("");
    const [clipBoard, setClipBoard] = useState(false)

    const { show } = useContextMenu({
        id: MENU_ID,
      });

      function closeModal(){
        setShowit(false);
        setShowit1(false);
        setShowit2(false);
    }

    function handleDelete(){

      var filesdel = database.a_files
      .where("folderId","==", fid);
      filesdel.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(docm) { 
          const storageRef = firebase.storage().ref();
          var path = 'a_files/'+fid+'/'+docm.data().uniqueid;
          // console.log(path)
          var fileRef = storageRef.child(path);
          fileRef.delete();
          docm.ref.delete();
        });
    }); 
  
      database.a_folders
        .doc(fid)
        .delete()
        .then(() => {
          console.log('Assignment deleted')
        })
        .catch((error) => {
          console.error('Error :', error)
        })

        database.s_details.where("assgid", "==", fid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc1) => {
                doc1.ref.delete()
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
  
  }

      function displayMenu(e) {
        show(e, { props: { id: Number(e.currentTarget.id), showit1: showit1, folderId : folder.id , folderName : folder.name, showit : showit , details : folder.createdAt, date: folder.date, desp : folder.desp} });
      }
    
      function handleItemClick({ event, props, data, triggerEvent}) {
        switch (event.currentTarget.id) {
          case "open":
            history.push(`/assignment/${props.folderId}`);
            break;

          case "delete":
            setFid(props.folderId);
            setShowit1(true);
            break;

          case "details":
            setShowit2(true)
            setFname(props.folderName)
            setuploadDetail(Date(props.details.toMillis()))
            setFdate(props.date)
            setFdesp(props.desp)
            break;

          case "share":
            setFid(props.folderId);
            setShowit(true);
            break;
        }
      }

    return (
      <Fragment>
        <div>
        <Button 
            onContextMenu={displayMenu}
            id={folder.id}
            to={`/assignment/${folder.id}`} 
            variant="outline-secondary" 
            className="text-truncate w-100" 
            as={Link}>
            <FontAwesomeIcon icon={faFolder} className="mr-2"/>
            {folder.name}
        </Button>
        
        {/* CONTEXT MENU FOR THE COMPONENT */}
        <Menu id={MENU_ID}>
            <Item id="open" onClick={handleItemClick} >
              Open
            </Item>
            <Item id="share" onClick={handleItemClick}>
              Share
            </Item>
            <Item id="details" onClick={handleItemClick}>
              Details
            </Item>
            <Item id="delete" onClick={handleItemClick}>
              Delete
            </Item>
        </Menu>


        {/* FOR SHOWING DETAILS OF THE FOLDER */}
        <Modal show={showit2} onHide={closeModal}>
            <Modal.Body>
            <h3 align="center">Assignment details</h3>
                <p>Assignment Name :  {fname}</p>
                <p>Created On      : {(""+uploaddetail).substring(0,34)+"(IST)"}</p>
                <p>Due Date        : {fdate}</p>
                <p>Description     : {fdesp}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
          </Modal>

          {/* FOR SHARING THE FOLDER */}
          <Modal show={showit} onHide={closeModal}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Sharable link for this folder :</Form.Label>
            <Form.Label>
              {'https://dcfstudentsview.netlify.app/assignment/'+ String(fid) }
              <p></p>
              <CopyToClipboard
                text={'https://dcfstudentsview.netlify.app/assignment/'+ String(fid)}
                onCopy={() => setClipBoard(true)}
              >
                <FontAwesomeIcon icon={faPaste} />
              </CopyToClipboard>
              {clipBoard ? <span style={{ color: 'red' }}> Copied.</span> : null}
            </Form.Label>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Assignment Delete Confirmation*/}
      <Modal show={showit1} onHide={closeModal}>
        <Form>
          <Modal.Body>
            <div>Do you want to delete the Assignment and its contents ?</div>
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
    );

}