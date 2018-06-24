
import ReactDOM from 'react-dom';
import './index.css';
import { makeMainRoutes } from './routes';
import registerServiceWorker from './registerServiceWorker';

const routes = makeMainRoutes();
// console.log(routes);
ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
