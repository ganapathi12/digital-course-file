import {React,useState, Componen } from 'react'
import { useEffect } from 'react'
import { Container, Navbar, Nav,Row,Col,Table} from 'react-bootstrap'
import 'firebase/storage'
import Sidebar from './Sidebar'
import FeedbackShare from './FeedbackShare'
import { database } from '../fire.js'
import firebase from 'firebase'
import ParticlesBg from 'particles-bg'

const Feedback = () => {

  window.beforeunload = (e) => {
    console.log('Stop this');
    e.preventDefault()
    e.returnValue = '';
  };
  const [feedbacks , setFeedbacks] = useState([]);
  const Fetchdata = () => {
    database.feedback.where("proff_id","==", firebase.auth().currentUser.uid).get().then((querySnapshot) => {
        querySnapshot.forEach(element => {
            var data = element.data();
            setFeedbacks(arr => [...arr , data]);    
        })
    })
  } 
    useEffect(() => {
      Fetchdata();
  }, [])


    // console.log(feedbacks)
    return (
      <>
        {/* <Sidebar/> */}
        <Container fluid >
        <Row >
            <Col xl={3} lg={4} xs={3} sm={3} md={5} style={{marginLeft : '-15px'}}><Sidebar/></Col>
            <Col >
            <br></br>
              <Container fluid style={{marginLeft : '-45px'}}>
              <div className='d-flex align-items-center' >
                 <h4 className='flex-grow-1' >Feedback given by students :</h4>
                <FeedbackShare currentUserId={firebase.auth().currentUser.uid}/>
              </div>
              <br></br><br></br>
              <div className='d-flex flex-wrap'>
              { feedbacks && feedbacks.length>0 ? 
                (<Table id='MyTable' striped bordered hover >
                    <thead>
                        <tr align='center'>
                        <th style={{width: '5%'}}>SNO</th>
                        <th  style={{width: '10%'}}>Course Rating (1-5)</th>
                        <th  style={{width: '10%'}}>Teaching Rating (1-5)</th>
                        <th style={{width: '10%'}}>Overall Rating (1-10)</th>
                        <th style={{width: '40%'}}>Suggestions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {feedbacks.map((feedback,index) => (
                        <tr align='center'>
                            <td>{index+1}</td>
                            <td>{feedback.q1}</td>
                            <td>{feedback.q2}</td>
                            <td>{feedback.q3}</td>
                            <td>{feedback.q4}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>) : 
                
                (
                    <div className='d-flex justify-content-center'>
                    <p >No Feedbacks to display.</p>
                    </div>
                )
                }
        </div>
          {/* </main> */}
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


      </>
    )
  }


export default Feedback;
