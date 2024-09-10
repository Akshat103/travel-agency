import React from 'react'
import Search from '../../components/client/homepage/Search'
import Form from '../../components/client/homepage/Form'
import Imagination from '../../components/client/homepage/Imagination'
import TopDestinations from '../../components/client/homepage/TopDestinations'
import Explore from '../../components/client/homepage/Explore'
import Offer from '../../components/client/homepage/Offer'
import PromotionalAreas from '../../components/client/homepage/PromotionalAreas'
import News from '../../components/client/homepage/News'
import Parterners from '../../components/client/homepage/Parterners'
import Cta from '../../components/client/homepage/Cta'
import HomeBanner from '../../components/client/homepage/HomeBanner'

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