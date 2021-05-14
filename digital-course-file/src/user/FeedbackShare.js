import { React, useState,Fragment } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faPaste } from '@fortawesome/free-solid-svg-icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactTooltip from 'react-tooltip';

export default function FeedbackShare({ currentUserId }) {
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
        style={{ maxWidth: '100px' }}
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
            <Form.Label><h3>Sharable link for giving feedbacks : </h3></Form.Label>
            <br></br>
            <p></p>
            <Form.Label>
              <a href=
              {'https://dcfstudentsview.netlify.app/feedback/' +String(currentUserId)}
              >
                Click to view in Student View
              </a> 
              <br></br>
              <CopyToClipboard
                text={'https://dcfstudentsview.netlify.app/feedback/' +String(currentUserId)}
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
            <span style={divStyle}>Share Feedback Link</span>
      </ReactTooltip>
    </Fragment>
  )
}
