import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header/Header';
import Home from './Home/Home';
import JobPost from './JobPost/JobPost';
import NotFound from './NotFound/NotFound';
import NoticeBoard from './NoticeBoard/NoticeBoard';

const App = () => {
  return(
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/:jobId' element={<JobPost/>} />
        <Route path='/notice-board' element={< NoticeBoard />} />
        <Route path='/*' element={<NotFound/>} />
        
      </Routes>
    </Router>
  );
  

}

export default App;
