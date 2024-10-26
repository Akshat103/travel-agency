import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './redux/store.jsx';
import ErrorBoundary from './pages/ErrorBoundary.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          draggable
          theme="dark"
          pauseOnHover
        />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
);
