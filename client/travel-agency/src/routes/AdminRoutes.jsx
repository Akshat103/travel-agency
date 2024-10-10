import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../admin/AdminLayout'
import AdminHome from '../admin/pages/AdminHome'
import NotFound from '../pages/NotFound'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes