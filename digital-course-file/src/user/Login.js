import React, { useState } from 'react'
import GoogleButton from 'react-google-button'
import GithubButton from 'react-github-login-button'
import { Link } from 'react-router-dom'
import ParticlesBg from 'particles-bg'
import swal from 'sweetalert'

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
  const [confirmPassword, setConfirmPassword] = useState('')

  const checkPassword = () => {
    if (confirmPassword === password) {
      handleSignup()
    } else {
      swal('Oops!', 'Passwords did not match!', 'error')
    }
  }

  return (
    <section>
      <div className='loginContainer'>
        <label>Email</label>
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
        {!hasAccount && (
          <>
            <label>Confirm Password</label>
            <input
              name='password'
              type='password'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        <p className='errorMsg'>{passwordError}</p>
        <div className='btnContainer'>
          {hasAccount ? (
            <>
              <button name='signin' onClick={handleLogin}>
                Sign In
              </button>
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
              <button name='signup' onClick={checkPassword}>
                Sign up
              </button>

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

      <ParticlesBg type='cobweb' bg={true} />
    </section>
  )
}
export default Login
