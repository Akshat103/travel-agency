import React from 'react'
import Search from '../components/homepage/Search'
import Form from '../components/homepage/Form'
import Imagination from '../components/homepage/Imagination'
import TopDestinations from '../components/homepage/TopDestinations'
import Explore from '../components/homepage/Explore'
import Offer from '../components/homepage/Offer'
import PromotionalAreas from '../components/homepage/PromotionalAreas'
import News from '../components/homepage/News'
import Parterners from '../components/homepage/Parterners'
import Cta from '../components/homepage/Cta'
import HomeBanner from '../components/homepage/HomeBanner'

const ClientHome = () => {
  return (
    <div className="client-home">
      <Search />
      <HomeBanner />
      <Form />
      <Imagination />
      <TopDestinations />
      <Explore />
      <Offer />
      <PromotionalAreas />
      <News />
      <Parterners />
      <Cta />
    </div>
  )
}

export default ClientHome