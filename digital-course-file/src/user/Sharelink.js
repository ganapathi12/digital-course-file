import { React , useState } from "react";
import { Button,Modal,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default function Sharelink( {currentFolder} ){
    const [open, setOpen] = useState(false);
    function openModal(){
        setOpen(true);
    }
    function closeModal(){
        setOpen(false);
    }
    
    return(
        <>
        <Button style={{maxWidth : "80px" }} onClick={openModal} className="mr-2" variant="primary" size="sm" >
            <FontAwesomeIcon icon={faLink} />
        </Button>
        <Modal show={open} onHide={closeModal} >
              <Modal.Body>
                {/* text area that will display link */}
                <p>Sharable link for this folder : </p>
                <textarea rows="2" cols="55" utofocus readOnly value={"www.dcfstudentview.com/"+String(currentFolder.id)}> 
                </textarea>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
          </Modal>
        </>
    );
}