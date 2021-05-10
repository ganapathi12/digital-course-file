import { React, useState, Fragment } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { database } from '../fire.js'
import firebase from 'firebase'
import { ROOT_FOLDER } from '.././hooks/useFolder'
import ReactTooltip from 'react-tooltip'

export default function CreateAssignment({ currentFolder }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [desp, setDesp] = useState('')

  var today = new Date()
  let date1;
  if(today.getMonth() + 1 < 10)
    date1 = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
  else
    date1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const divStyle = {
    fontWeight: 'bold',
    color: 'black'
  };
  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }


  function handleSubmit(e) {
    e.preventDefault()
    database.a_folders.add({
      name: name,
      userId: firebase.auth().currentUser.uid,
      parentId: null,
      date: date,
      createdAt: database.getTime(),
      desp: desp,
      toggle : (date1>date) ? false : true, 
    })
    setName('')
    setDate('')
    setDesp('')
    closeModal()
  }

  return (
    <Fragment>
      <Button
        data-tip
        data-for='createassignment'
        className='mr-2'
        name='assg'
        style={{ maxWidth: '140px' }}
        onClick={openModal}
        // style={divStyle}
      >
      <FontAwesomeIcon icon={faFilePdf} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Assignment Name</Form.Label>
              <Form.Control
                type='text'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type='date'
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='textarea'
                required
                value={desp}
                onChange={(e) => setDesp(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button name='create_assignment' variant='success' type='submit'>
              Create Assignment
            </Button>
            <Button variant='danger' onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ReactTooltip id='createassignment' type='success' place='bottom' effect='solid'>
        <span style={divStyle}>Create Assignment</span>
      </ReactTooltip>
    </Fragment>
  )
}
