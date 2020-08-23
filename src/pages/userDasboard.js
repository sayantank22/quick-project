import React from 'react';
import ImageUpload from '../components/ImageUpload';

const UserDashboard = () => (
  <div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
      <i className='fab fa-react' /> React Image Upload
    </h4>

    <ImageUpload />
  </div>
);

export default UserDashboard;
