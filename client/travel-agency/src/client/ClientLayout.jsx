import React from 'react'
import ClientHeader from './components/ClientHeader'

const ClientLayout = ({ children }) => {
  return (
    <div className="client-layout">
      <ClientHeader />
      <main className="client-main-content">
        {children}
      </main>
    </div>
  )
}

export default ClientLayout
