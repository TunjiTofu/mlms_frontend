import { Typography, Link } from '@mui/material'
import React from 'react'

function Register({ handleChange }) {
    return (
        <div>
            Register now
            <Typography>
            <Link href="#">Forgot Password?</Link>
          </Typography>
          <Typography>
            <Link href="#" onClick={() => handleChange("event", 0)}>
              Have an Account? Sign In
            </Link>
          </Typography>
        </div>
    )
}

export default Register
