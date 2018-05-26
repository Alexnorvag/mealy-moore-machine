import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App/App';
import registerServiceWorker from './Components/registerServiceWorker';

//react-table css
import 'react-table/react-table.css'

ReactDOM.render(
    <App main="I am the main" footer="I am the footer"/>, document.getElementById('root'));
registerServiceWorker();
