import React from 'react';
import Lists from './Lists';
import Details from './Details';
import { Route, Routes } from 'react-router-dom';

// APIKEY = 4301e88ef8e0ec257630fe77c454eadb

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Lists />} />
        <Route path="/detail/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
