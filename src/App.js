import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header/Header';
import Home from './Home/Home';
import JobView from './JobView/JobView';
import NotFound from './NotFound/NotFound';
import NoticeBoard from './NoticeBoard/NoticeBoard';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import JobForm from './JobForm/JobForm';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

// const axios = require('axios').default;

const App = () => {
  return(
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/notice-board/:owner' element={< NoticeBoard />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route 
          path='/jobform' 
          element={
            <ProtectedRoute>
              <JobForm />
            </ProtectedRoute>
          } />
        <Route path='/jobview' element={<JobView />} />
        <Route path='/*' element={<NotFound/>} />
        
      </Routes>
    </Router>
  );
  

}

export default App;
