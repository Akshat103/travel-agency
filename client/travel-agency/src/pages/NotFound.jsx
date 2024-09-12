import React from 'react';
import Banner from '../client/components/Banner';

const NotFound = () => {
  return (
    <div>
      <Banner
        title="Travel Agency"
        breadcrumbs={[
          { text: 'Home', link: '/' },
          { text: 'Travel Agency' },
        ]}
      />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;