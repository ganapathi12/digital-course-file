import { React, useState, Fragment } from 'react'
import { Container, Navbar, Nav,Row,Col} from 'react-bootstrap'
import firebase from 'firebase'
import 'firebase/storage'
import ReactTooltip from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import ParticlesBg from 'particles-bg'
import Sidebar from './user/Sidebar'
import viewimg from './UserProfile.png'

export default function UserProfile() {
  const [open, setOpen] = useState(false)
  const [uid, setuid] = useState(firebase.auth().currentUser.email)
  const [uid1, setuid1] = useState(firebase.auth().currentUser.uid)
  const [create1, setcreate1] = useState(firebase.auth().currentUser.ba.currentUser.metadata.creationTime)
  const [time, settime] = useState(firebase.auth().currentUser.ba.currentUser.metadata.lastSignInTime)

  return (
    <>
      
      
      {/* <Sidebar/> */}
      <Container fluid style={{backgroundColor :'#ADD8E6'}}>
      {/* <ParticlesBg type='cobweb' bg={true} /> */}
      <Row >
          <Col xl={3} lg={4} xs={3} sm={3} md={5} style={{marginLeft : '-15px'}}><Sidebar/></Col>
          <Col >
          <br></br>
            <Container fluid style={{marginLeft : '-45px'}} >
            <div className='d-flex justify-content-center'>
              <img src={viewimg} style={{width : '80px' , height : '80px'}}></img>
            </div>
            {/* <div className='d-flex justify-content-center'> */}
            <br></br>
            <Container>
                <div className='d-flex justify-content-center'>
                  <h3 align='center'><b>EMAIL ID</b> <p>{uid}</p></h3>
                </div>
                <br></br>

                <div className='d-flex justify-content-center'>
                <h3 align='center'><b>USER ID</b> <p>{uid1}</p></h3>
                </div>     
                <br></br>

                <div className='d-flex justify-content-center'>
                <h3 align='center'><b>CREATED ON</b> <p>{create1}</p></h3>
                </div>   
                <br></br>

                <div className='d-flex justify-content-center'>
                <h3 align='center'><b>LAST LOGIN</b> <p>{time}</p></h3>
                </div>    
                </Container>
            {/* </div> */}

        </Container>
          </Col>
          </Row> 
      </Container>
      <Navbar fixed='bottom' variant='light' bg='light'>
        <Container className='ml-sm-2'>
          <Nav.Link eventKey={2} href='copyright'>
            &copy; Digital Course File Group 2
          </Nav.Link>
        </Container>
      </Navbar>


    </>)
    }
