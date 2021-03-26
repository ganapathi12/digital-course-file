import { React, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faPaste } from '@fortawesome/free-solid-svg-icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function Sharelink({ currentFolder }) {
  const [open, setOpen] = useState(false)
  const [clipBoard, setClipBoard] = useState(false)
  function openModal() {
    setOpen(true)
  }
  function closeModal() {
    setOpen(false)
  }

  return (
    <>
      <Button
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
              {'www.dcfstudentview.com/' + String(currentFolder.id)}
              <p></p>
              <CopyToClipboard
                text={'www.dcfstudentview.com/' + String(currentFolder.id)}
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
    </>
  )
}
