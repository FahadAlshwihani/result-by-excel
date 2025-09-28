import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import ResultPage from './pages/ResultPage';
import Footer from './Layout/Footer'; // Import the Footer component
import './App.css';

export default function App() {
  return (
    <div className="app-wrapper">
      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
