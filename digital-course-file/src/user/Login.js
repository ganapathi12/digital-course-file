import React from 'react'
import GoogleButton from 'react-google-button'
import GithubButton from 'react-github-login-button'

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
          type='text'
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <p className='errorMsg'>{emailError}</p>
        <label>Password</label>
        <input
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='errorMsg'>{passwordError}</p>
        <div className='btnContainer'>
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Sign In</button>
              <p>
                Don't have an account ?{' '}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
              <p></p>
              <GoogleButton onClick={googlesignin} />
              <p></p>
              
              <GithubButton
                onClick={githubsignin}
              />
            </>
          ) : (
            <>
              <button onClick={handleSignup}>Sign up</button>
              <p>
                Have an account ?{' '}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
              </p>
              <p></p>
              <GoogleButton onClick={googlesignin} />
              <p></p>
              
              <GithubButton
                onClick={githubsignin}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
export default Login
