import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './redux/store.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer
    position='bottom-right'
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    pauseOnFocusLoss
    draggable
    theme="dark"
    pauseOnHover
  />
  </Provider>
)
