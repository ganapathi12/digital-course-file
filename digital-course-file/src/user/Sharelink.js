import { React, useState,Fragment } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faPaste } from '@fortawesome/free-solid-svg-icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactTooltip from 'react-tooltip';
import firebase from 'firebase'


export default function Sharelink({ currentFolder }) {
  const divStyle = {
    fontWeight: 'bold',
    color: 'black'
  };
  const [open, setOpen] = useState(false)
  const [clipBoard, setClipBoard] = useState(false)
  function openModal() {
    setOpen(true)
  }
  function closeModal() {
    setOpen(false)
  }

  return (
    <Fragment>
      <Button
        data-tip data-for='sharefolderlink'
        name='share_link'
        style={{ maxWidth: '80px' }}
        onClick={openModal}
        className='mr-2'
        variant='primary'
        size='sm'
      >
        <FontAwesomeIcon icon={faLink} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Sharable link for this folder :</Form.Label>
            <Form.Label>
              {'https://dcfstudentsview.netlify.app/folders/' +String(firebase.auth().currentUser.uid)+'/'+ String(currentFolder.id) }
              <p></p>
              <CopyToClipboard
                text={'https://dcfstudentsview.netlify.app/folders/' +String(firebase.auth().currentUser.uid)+'/'+ String(currentFolder.id)}
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

      <ReactTooltip id='sharefolderlink' type='success' place='bottom' effect='solid'>
            <span style={divStyle}>Share Folder Link</span>
      </ReactTooltip>
    </Fragment>
  )
}
