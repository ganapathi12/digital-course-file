import React, { useState, useEffect, Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './core/Home'
import Hero from './user/Hero'
import Signin from './user/Signin'
import copyright from './user/copyright'
import { Link } from 'react-router-dom'
import { Container, Button, Navbar, Nav } from 'react-bootstrap'
import fire from './fire'
import ForgotPassword from './user/ForgotPassword'
import { LinkContainer } from 'react-router-bootstrap'
import UserProfile from './userprofie'
import CreateAssignment from './user/createassignment'
import Assign_button from './user/Assign_button'
import Assignments from './user/Assignments'
import Clock from 'react-live-clock'

const Routes = () => {
  const [user, setUser] = useState('')
  var today = new Date(),
  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser('')
      }
    })
  }
  useEffect(() => {
    authListener()
  }, [])
  // const handleLogout = () => {
  //   fire.auth().signOut()
  //   //this.props.history.push('/')
  // }
  return (
    <BrowserRouter>
      <section className='hero'>
        <nav>
          <Navbar.Brand as={Link} to='/'>
            <h2>Course File System</h2>
          </Navbar.Brand>
          {/* {user && (<UserProfile></UserProfile>)} */}
          {/* {user && (<CreateAssignment></CreateAssignment>)} */}
          {/* {user && (<Assign_button></Assign_button>)} */}
          <h3 style={{backgroundColor: '#603bbb',color: 'white'}}>
            {date}
          </h3>
          <h3 style={{backgroundColor: '#603bbb',color: 'white'}}>
            <Clock format="HH:mm:ss" interval={1000} ticking={true}/>
            </h3>
          {user && (
            <Link to='/signin'>
              <button
                className='logoutbutton'
                onClick={() => fire.auth().signOut()}
              >
                Logout
              </button>
            </Link>
          )}
        </nav>
      </section>
      <Switch>
        {/*Assignments*/}
        <Route path='/assignment' exact component={Assignments} />
        <Route path='/assignment/:folderId' exact component={Assignments} />

        {/*Folders*/}
        <Route path='/folder/:folderId' exact component={Hero} />
        <Route path='/' exact component={Signin} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/copyright' component={copyright} />
        <Route path='/folder/copyright' component={copyright} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/profile' component={UserProfile} />

      </Switch>
      <Navbar fixed='bottom' variant='light' bg='light'>
        <Container className='ml-sm-2'>
          <LinkContainer to='/copyright'>
            <Nav.Link>&copy; Digital Course File Group 2</Nav.Link>
          </LinkContainer>
        </Container>
      </Navbar>
    </BrowserRouter>
  )
}

export default Routes