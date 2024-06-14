import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import PostData from  './component/PostData'; 


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<PostData />} />
        
      
        
      </Routes>
    </Router>
  );
};

export default App;