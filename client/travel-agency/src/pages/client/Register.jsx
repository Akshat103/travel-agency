import React from 'react'
import RegisterForm from '../../components/client/register/RegisterForm'
import Banner from '../../components/client/Banner'

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
