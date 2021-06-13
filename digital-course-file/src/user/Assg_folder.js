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

    const [open, setopen] = useState(false);
    const [showit, setShowit] = useState(false);
    const [showit1, setShowit1] = useState(false);
    const [showit2, setShowit2] = useState(false);
    const [fname,setFname] = useState(folder.name);
    const [fid,setFid] = useState(folder.id);
    const [fdate,setFdate] = useState('');
    const [fdesp,setFdesp] = useState('');
    const [uploaddetail,setuploadDetail] = useState("");
    const [clipBoard, setClipBoard] = useState(false)
    const [enable, setEnable] = useState(folder.toggle)

    const { show } = useContextMenu({
        id: MENU_ID,
      });

      function closeModal(){
        setShowit(false);
        setShowit1(false);
        setShowit2(false);
        setopen(false);
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

  function handleEdit(e){
    e.preventDefault()
    const docRef1 = database.a_folders.doc(fid)
    docRef1.update({ name: fname,date :fdate,desp :fdesp  })
    closeModal();
  }

      function displayMenu(e) {
        show(e, { props: { id: Number(e.currentTarget.id), showit1: showit1, folderId : folder.id , folderName : folder.name, showit : showit , details : folder.createdAt, date: folder.date, desp : folder.desp, toggle : folder.toggle, enable : enable} });
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
            setuploadDetail(props.details.toDate())
            setFdate(props.date)
            setFdesp(props.desp)
            setEnable(props.toggle)
            break;

            
          case "share":
            setFid(props.folderId);
            setShowit(true);
            break;

          case "edit":
            setopen(true);
            setFid(props.folderId);
            setFname(props.folderName)
            setFdate(props.date)
            setFdesp(props.desp)
            setShowit(true);
            break;

          case "toggle":
            setEnable(!(props.toggle))
            const docRef = database.a_folders.doc(props.folderId)
            docRef.update({ toggle: !(props.toggle) })
            break
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
            <Item id="edit" onClick={handleItemClick}>
              Modify
            </Item>
            <Item id="delete" onClick={handleItemClick}>
              Delete
            </Item>
            <Item id="toggle" onClick={handleItemClick}>
              Allow / Disallow
            </Item>
        </Menu>


        {/* FOR SHOWING DETAILS OF THE FOLDER */}
        <Modal show={showit2} onHide={closeModal}>
            <Modal.Body>
            <h3 align="center">Assignment details</h3>
                <p>Assignment Name :  {fname}</p>
                <p>Created On      : {(""+uploaddetail).substring(0,25)+"(IST)"}</p>
                <p>Due Date        : {fdate}</p>
                <p>Description     : {fdesp}</p>
                {enable && 
                    <p>Submissions     : Allowed</p>    }  
                {!enable && 
                    <p>Submissions     : Not Allowed</p>    }              
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
            <Form.Label><h3>Sharable link for this Assignment :</h3></Form.Label>
            <br></br>
            <Form.Label>
              <a href=
              {'https://dcfstudentsview.netlify.app/assignment/'+ String(fid) }>
                Click to view Assignment Portal
              </a>
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
              Delete
            </Button>
            <Button variant='primary' onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Assignment Edit Details*/}
        <Modal show={open} onHide={closeModal}>
          <Form onSubmit={handleEdit}>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Assignment Name</Form.Label>
                <Form.Control
                  type='text'
                  required
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type='date'
                  required
                  value={fdate}
                  onChange={(e) => setFdate(e.target.value)}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='textarea'
                  required
                  value={fdesp}
                  onChange={(e) => setFdesp(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button name='create_assignment' variant='success' type='submit'>
                Modify Assignment
              </Button>
              <Button variant='danger' onClick={closeModal}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        </div>
        </Fragment>
    );

}