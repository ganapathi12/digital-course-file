import { React,useState,Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { Button,Modal,Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { database } from '../fire.js'
import firebase from 'firebase'
import { useContextMenu, Menu, Item, Separator } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

export default function Assg_folder({folder}) {
    const MENU_ID = "#aadsd299dfsdwqwdasc29";
    const history = useHistory();

    const [showit, setShowit] = useState(false);
    const [showit1, setShowit1] = useState(false);
    const [fname,setFname] = useState(folder.name);
    const [fid,setFid] = useState(folder.id);
    const [uploaddetail,setuploadDetail] = useState("");
    const [name, setName] = useState(folder.name);

    const { show } = useContextMenu({
        id: MENU_ID,
      });

      function closeModal(){
        setShowit(false);
        setShowit1(false);
    }
      function displayMenu(e) {
        show(e, { props: { id: Number(e.currentTarget.id) , folderId : folder.id , folderName : folder.name, showit : showit , details : folder.createdAt} });
      }
    
      function handleItemClick({ event, props, data, triggerEvent}) {
        switch (event.currentTarget.id) {
          case "open":
            history.push(`/assignment/${props.folderId}`);
            break;

          case "rename":
            setFid(props.folderId);
            setShowit1(true);
            setName(props.folderName);
            break;

          case "details":
            setShowit(true);
            setFname(props.folderName);
            setuploadDetail(Date((props.details).toMillis()));
            break;
  
        }
      }


      function handleSubmit(e){

        //Renaming the current folder in database
        e.preventDefault();
        const docRef = database.folders.doc(fid);
        docRef.update({"name": name});
        closeModal();
        
        //Changing name of path in all child folders
        var folderdel = database.folders
        .where("userId","==", firebase.auth().currentUser.uid)
        .where("parents", "array-contains", fid);
        folderdel.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              const child_folder_id = doc.id;
              const child_folder_path = doc.data().path;
              for (var key in child_folder_path) {
                if(child_folder_path[key].id == fid){
                  child_folder_path[key].name = name;
                }
              }
              const docRef1 = database.folders.doc(child_folder_id);
              docRef1.update({"path": child_folder_path});
            });
        });
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
            <Item id="delete" onClick={handleItemClick}>
              Delete
            </Item>
        </Menu>


        {/* FOR SHOWING DETAILS OF THE FOLDER */}
        <Modal show={showit} onHide={closeModal}>
            <Modal.Body>
            <h3>Folder details</h3>
                <p>Folder  :  {fname}</p>
                <p>Created On : {(""+uploaddetail).substring(0,34)+"(IST)"}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
          </Modal>

          {/* FOR RENAMING THE FOLDER */}
          <Modal show={showit1} onHide={closeModal} >
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>RENAME FOLDER</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
              <Button variant="success" type="submit">
                  Rename
                </Button>
                <Button variant="danger" onClick={closeModal}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>

        </div>
        </Fragment>
    );

}