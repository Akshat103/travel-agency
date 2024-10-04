import React from 'react'
import Search from '../components/homepage/Search'
import Form from '../components/homepage/Form'
import Imagination from '../components/homepage/Imagination'
import TopDestinations from '../components/homepage/TopDestinations'
import HomeBanner from '../components/homepage/HomeBanner'

const ClientHome = () => {
  return (
    <div className="client-home">
      <Search />
      <HomeBanner />
      <Form />
      <Imagination />
      <TopDestinations />
    </div>
  )
}

export default ClientHome