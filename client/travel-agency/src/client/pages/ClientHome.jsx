import React from 'react'
import Search from '../components/homepage/Search'
import Form from '../components/homepage/Form'
import Imagination from '../components/homepage/Imagination'
import TopDestinations from '../components/homepage/TopDestinations'
import HomeBanner from '../components/homepage/HomeBanner'
import WelcomeModal from '../components/WelcomeModal'
import ClientFooter from '../components/ClientFooter'

const ClientHome = () => {
  return (
    <div className="client-home">
      <WelcomeModal />
      <Search />
      <HomeBanner />
      <Form />
      <Imagination />
      <TopDestinations />
      <ClientFooter />
    </div>
  )
}

export default ClientHome