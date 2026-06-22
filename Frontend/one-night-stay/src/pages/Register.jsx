import React from 'react'
import '../App.css'

const Register = () => {
  return (
    <>
      <div className='registerbox'>
        <form action="" method="post">
          <h1 className='registerhere'>Register Here</h1> <br />
          <p>Enter Name</p>
          <input type="text" placeholder='Enter your Name' required name=""  id="" /> <br /><br />

          <p>Enter Email</p>
          <input type="email" placeholder='Enter your Email' required name=""  id="" /> <br /><br />

          <p>Enter Number</p>
          <input type="text" placeholder='Enter your Number' required maxLength={10} name=""  id="" /> <br /><br />

          <p>Enter Password</p>
          <input type="password" placeholder='Enter your Password' required maxLength={15} minLength={8} name=""  id="" /> <br /><br />

          <p>Enter Confirm Password</p>
          <input type="password" placeholder='Enter your Confirm Password' required maxLength={15} minLength={8} name=""  id="" /> <br /><br />

          <button type="submit">Register</button> <br /><br />

          <p>Already a user ?<span>Log-in</span></p>
        </form>
      </div>
    </>
  )
}

export default Register
