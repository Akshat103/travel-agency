import { createRoot } from 'react-dom/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';
import ErrorBoundary from './pages/ErrorBoundary.jsx';
import { BrowserRouter } from 'react-router-dom';
import './toastStyles.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          draggable={false}
          theme="dark"
          className="custom-toast-container"
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
        />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
);