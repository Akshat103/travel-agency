import React from 'react'
import LogInForm from '../components/login/LogInForm'
import Banner from '../components/Banner'

const LogIn = () => {
  return (
    <>
      <Banner
        title="Login"
        breadcrumbs={[
          { text: 'Home', link: '/' },
          { text: 'Login' },
        ]}
      />
      <LogInForm />
    </>
  )
}

export default LogIn
