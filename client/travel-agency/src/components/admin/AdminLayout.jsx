import React from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminHeader />
      {children}
      <AdminFooter />
    </div>
  )
}

export default AdminLayout;