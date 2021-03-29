import { React , useState } from "react";
import { Button, Modal, ModalFooter} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter, faFolderMinus } from "@fortawesome/free-solid-svg-icons";
import { database } from '../fire.js'
import firebase from 'firebase'
import { Link } from "react-router-dom";

// {currentFolder}
export default function AddFolder( {currentFolder} ){
    const [open, setOpen] = useState(false);
    const temp_parent = ""+currentFolder.parentId;
    const [path, setpath] = useState(``);
    
    function openModal(){
        { temp_parent != "null" && (setpath(`/folder/${temp_parent}`))}
        setOpen(true);
    }

    function closeModal(){
        setOpen(false);
    }
    
    function handleDelete(){
        var folderdel = database.folders
        .where("userId","==", firebase.auth().currentUser.uid)
        .where("parents", "array-contains", currentFolder.id);
        folderdel.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
        });

      database.folders.doc(currentFolder.id).delete().then(() => {
            console.log("Folder deleted");
        }).catch((error) => {
            console.error("Error :", error);
        });
    }

    return (
        <>
          <Button style={{maxWidth : "80px" }} className="mr-2" onClick={openModal} variant="danger" size="sm" >
            <FontAwesomeIcon icon={faFolderMinus} />
          </Button>
          <Modal show={open} onHide={closeModal} >
          <Modal.Body>
              <div>
                  Do you want to delete the current folder ?   
              </div>
              </Modal.Body>
              <ModalFooter>
              <Button  style={{float: 'left'}} className="mr-2" variant="danger" onClick={handleDelete} as={Link} 
              to= {path} >
                  DELETE
              </Button>
              <Button style={{maxWidth : "80px" }} className="mr-2" variant="primary" onClick={closeModal} >
                Cancel
              </Button>
              </ModalFooter>
          </Modal>
        </>
      );
}
