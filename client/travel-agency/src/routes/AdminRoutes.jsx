import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../admin/AdminLayout'
import AdminHome from '../admin/pages/AdminHome'
import NotFound from '../pages/NotFound'
import OrderPage from '../admin/pages/OrderPage'
import UserSearchPage from '../admin/pages/UserSearchPage'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/users" element={<UserSearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes