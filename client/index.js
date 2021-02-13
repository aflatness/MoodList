import React from 'react';
import ReactDom from 'react-dom';
import './main.css'
import { BrowserRouter }from 'react-router-dom';
import App from './components/App.jsx';

ReactDom.render(<App />, document.getElementById('app'));