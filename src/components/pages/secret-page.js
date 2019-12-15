import React from 'react';
import { Redirect } from 'react-router-dom';

const SecretPage = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <div classname='jumbotron text-center'>
        <h3>This page is full of sectets!!11</h3>
      </div>
    )
  }
  return <Redirect to='/login' />;
}
export default SecretPage;