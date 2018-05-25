import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App/App';
import registerServiceWorker from './Components/registerServiceWorker';

ReactDOM.render(
    <App main="I am the main" footer="I am the footer"/>, document.getElementById('root'));
registerServiceWorker();
