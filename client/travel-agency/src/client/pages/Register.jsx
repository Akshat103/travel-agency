import React from 'react'
import RegisterForm from '../components/register/RegisterForm'
import Banner from '../components/Banner'

const Register = () => {
  return (
    <>
    <Banner
      title="Register"
      breadcrumbs={[
        { text: 'Home', link: '/' },
        { text: 'Register' },
      ]}
    />
    <RegisterForm />
    </>
  )
}

export default Register
