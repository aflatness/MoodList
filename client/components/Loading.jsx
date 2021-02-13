import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => (
  <div  id='loading-notice' >
    <div>Currating your perfect playlist</div>
    <br />
    <Spinner animation='border' variant='success' />
  </div>
);

export default Loading;