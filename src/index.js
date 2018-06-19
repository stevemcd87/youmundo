import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './routes';
import registerServiceWorker from './registerServiceWorker';

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
