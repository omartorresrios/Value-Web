import ReactDOM from 'react-dom';
import routes from './routes';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  routes,
  document.getElementById('root'));

serviceWorker.register();
