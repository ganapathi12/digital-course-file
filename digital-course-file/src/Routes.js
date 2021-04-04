import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import PrivateRoutes from "./auth/helper/PrivateRoutes"
// import Cart from "./core/Cart"
import Home from './core/Home'
import Hero from './user/Hero'
import Signin from './user/Signin'
// import UserDashboard from "./user/UserDashboard"
import copyright from './user/copyright'
import { Link } from 'react-router-dom'
import { Container, Button, Navbar, Nav } from 'react-bootstrap'
import fire from './fire'
import ForgotPassword from './user/ForgotPassword'
import { LinkContainer } from 'react-router-bootstrap'
import UserProfile from './userprofie'

const Routes = () => {
  const [user, setUser] = useState('')
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
          {user && (<UserProfile></UserProfile>)}
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
        {/*Folders*/}
        <Route path='/folder/:folderId' exact component={Hero} />
        <Route path='/' exact component={Signin} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/copyright' component={copyright} />
        <Route path='/folder/copyright' component={copyright} />
        <Route path='/forgot-password' component={ForgotPassword} />
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
