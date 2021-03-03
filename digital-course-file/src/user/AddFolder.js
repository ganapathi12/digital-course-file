import { React , useState } from "react";
import { Button,Modal,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { database } from '../fire.js'
import firebase from 'firebase'
import { ROOT_FOLDER } from '.././hooks/useFolder'

// {currentFolder}
export default function AddFolder( {currentFolder} ){
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    function openModal(){
        setOpen(true);
    }

    function closeModal(){
        setOpen(false);
    }

    function handleSubmit(e){

      if(currentFolder == null) return;

      const path =  [...currentFolder.path];
      if(currentFolder !== ROOT_FOLDER){
          path.push( { name : currentFolder.name , id : currentFolder.id} )
      }

      e.preventDefault();
      database.folders.add({
        name : name,
        parentId : currentFolder.id,
        userId: firebase.auth().currentUser.uid,
        path : path,
        createdAt : database.getTime()
      })
      setName("");
      closeModal();
    }


    return (
        <>
          <Button style={{maxWidth : "80px"}} onClick={openModal} variant="primary" size="lg">
            <FontAwesomeIcon icon={faFolderPlus} />
          </Button>
          <Modal show={open} onHide={closeModal} >
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Folder Name</Form.Label>
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
                  Add Folder
                </Button>
                <Button variant="danger" onClick={closeModal}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      );
}
