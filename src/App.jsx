import './App.css';
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from 'pages/Landing';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
