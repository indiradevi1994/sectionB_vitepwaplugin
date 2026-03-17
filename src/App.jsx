import React from 'react';
import './App.css'; // Import the new CSS file here!
import { FixerProvider } from './context/FixerContext';
import CurrencyConverter from './components/CurrencyConverter';

export default function App() {
  return (
    <FixerProvider>
      <div className="app-container">
        <h1 className="header-title">Global Exchange</h1>
        <p className="header-subtitle">Live rates powered by Fixer API</p>
        
        <CurrencyConverter />
        
      </div>
    </FixerProvider>
  );
}