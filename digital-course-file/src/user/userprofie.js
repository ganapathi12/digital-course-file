import { React , useState,Fragment } from "react";
import { Button, Modal, ModalFooter} from 'react-bootstrap';
import firebase from 'firebase'
import "firebase/storage";
import ReactTooltip from 'react-tooltip';

export default function UserProfile( {currentFolder} ){
    const [open, setOpen] = useState(false);
    const [uid, setuid] = useState("");
    const [time, settime] = useState("");
    const divStyle = {
      marginLeft:"800px",maxWidth : "100px"
    }
    function openModal(){
        setOpen(true);
        console.log(firebase.auth())
        setuid(firebase.auth().currentUser.email);
        settime(firebase.auth().currentUser.ba.currentUser.metadata.lastSignInTime);
    }

    function closeModal(){
        setOpen(false);
    }

    return (
        <Fragment>
          <button data-tip data-for='profile' className="logoutbutton" name='myprofile' style={divStyle}  onClick={openModal}  >
            My Profile
          </button>
          <Modal show={open} onHide={closeModal} >
          <Modal.Body>
              <div>
                  <h3>My Profile: </h3>
                  <p></p>
                  Email: {uid}
                  <p></p>
                  Last Sign In Time: {time}
              </div>
              </Modal.Body>
              <ModalFooter>
              <Button variant='danger' onClick={closeModal}>
              Cancel
              </Button>
              </ModalFooter>
          </Modal>

          <ReactTooltip id='Profile' type='error' place='bottom' effect='solid'>
            <span style={{fontWeight:'bold'}}>My Profile</span>
          </ReactTooltip>
        </Fragment>
      );
}