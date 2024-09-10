import React from 'react'
import ClientHeader from './ClientHeader'
import ClientFooter from './ClientFooter'

const ClientLayout = ({ children }) => {
  return (
    <div className="client-layout">
      <ClientHeader />
      <main className="client-main-content">
        {children}
      </main>
      <ClientFooter />
    </div>
  )
}

export default ClientLayout
