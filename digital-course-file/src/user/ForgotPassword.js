import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import fire from '../fire'
import firebase from 'firebase'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const clearErrors = () => {
    setEmailError('')
    setEmail('')
  }

  const handleforgot = () => {
    clearErrors()
    fire
      .auth()
      .sendPasswordResetEmail(email)
      .catch((e) => {
        setEmailError(e.message)
      })
    setEmailError('Check your inbox for furthur instructions')
  }
  return (
    <section className='login'>
      <div className='loginContainer'>
        <p className='errorMsg'>{emailError}</p>
        <label>UserName</label>
        <input
          type='text'
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div className='btnContainer'>
          <button onClick={handleforgot}>Reset Password</button>
          <p>
            Have an account ?{' '}
            <Link to='/signin'>
              <span>Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
