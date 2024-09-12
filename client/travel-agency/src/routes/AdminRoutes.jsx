import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../admin/AdminLayout'
import AdminHome from '../admin/pages/AdminHome'

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminHome />} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminRoutes