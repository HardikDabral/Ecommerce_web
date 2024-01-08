import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import store from './redux/store';
import { Provider } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const authToken = localStorage.getItem('authToken');
  
  return authToken ? element : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/" element={<Navigate to="/auth" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
