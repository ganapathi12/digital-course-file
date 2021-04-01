import { React , useState } from "react";
import { Button, Modal, ModalFooter} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter, faFolderMinus } from "@fortawesome/free-solid-svg-icons";
import { database } from '../fire.js'
import firebase from 'firebase'
import { Link } from "react-router-dom";
import "firebase/storage";
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
            var filedel = database.files
            .where("userId","==", firebase.auth().currentUser.uid)
            .where("folderId","==",doc.id);
            filedel.get().then(function(querySnapshot) {
              querySnapshot.forEach(function(docm) { 
                const storageRef = firebase.storage().ref();
                var path = 'files/'+firebase.auth().currentUser.uid+'/'+docm.data().uniqueid;
                console.log(path)
                var desertRef = storageRef.child(path);
                desertRef.delete();
                docm.ref.delete();

              });
          }); 
            doc.ref.delete();
          });
      });

      var filedel = database.files
      .where("userId","==", firebase.auth().currentUser.uid)
      .where("folderId","==",currentFolder.id);
      filedel.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) { 
          const storageRef = firebase.storage().ref();
                var path = 'files/'+firebase.auth().currentUser.uid+'/'+doc.data().uniqueid;
                console.log(path);
                var desertRef1 = storageRef.child(path);
                desertRef1.delete();
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
          <Button name='del_folder' style={{maxWidth : "80px" }} className="mr-2" onClick={openModal} variant="danger" size="sm" >
            <FontAwesomeIcon icon={faFolderMinus} />
          </Button>
          <Modal show={open} onHide={closeModal} >
          <Modal.Body>
              <div>
                  Do you want to delete the current folder ?   
              </div>
              </Modal.Body>
              <ModalFooter>
              <Button name='del_confirm' style={{float: 'left'}} className="mr-2" variant="danger" onClick={handleDelete} as={Link} 
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