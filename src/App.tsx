import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarDetails from './pages/CarDetails';

const App: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/" element={<CarDetails />} />
    </Routes>
  )
}
export default App