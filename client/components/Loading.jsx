import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => (
  <div  id='loading-notice' >
    <div>Curating your perfect playlist</div>
    <br />
    <Spinner animation='border' variant='success' style={{fontSize: '20px'}}/>
  </div>
);

export default Loading;