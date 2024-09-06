import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { store } from './Redux/Store';
import User from './Wrapper/User';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (

    <>
      <Provider store={store}>
        <ToastContainer />
        <Routes>
          <Route path='/*' element={<User />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
