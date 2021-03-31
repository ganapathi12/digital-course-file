import React from 'react'
import GoogleButton from 'react-google-button'
import GithubButton from 'react-github-login-button'
import { Link } from 'react-router-dom'


const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    googlesignin,
    githubsignin,
  } = props

  
  return (
    <section className='login'>
      <div className='loginContainer'>
        <label>UserName</label>
        <input
          name='email'
          type='text'
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <p className='errorMsg'>{emailError}</p>
        <label>Password</label>
        <input
          name='password'
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='errorMsg'>{passwordError}</p>
        <div className='btnContainer'>
          {hasAccount ? (
            <>
              <button  name='signin' onClick={handleLogin}>Sign In</button>
              <div className='w-100 text-center mt-3'>
                <Link to='/forgot-password'>Forgot Password</Link>
              </div>
              <p>
                Don't have an account ?{' '}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
              <p></p>
              <GoogleButton onClick={googlesignin} />
              <p></p>

              <GithubButton onClick={githubsignin} />
            </>
          ) : (
            <>
              <button name='signup' onClick={handleSignup}>Sign up</button>
              
              <p>
                Have an account ?{' '}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
              </p>
              <p></p>

              <GoogleButton onClick={googlesignin} />
              <p></p>

              <GithubButton onClick={githubsignin} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
export default Login
