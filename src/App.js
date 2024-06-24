import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
 import MainApp from  './component/MainApp'; 



const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
};

export default App;