import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogContainer from './components/BlogContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<BlogContainer />} />
          <Route path="/blog/:id" element={<BlogContainer />} />
          <Route path="*" element={<BlogContainer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
