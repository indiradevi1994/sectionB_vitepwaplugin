import React from 'react';
import { FixerProvider } from './context/FixerContext';
import CurrencyConverter from './components/CurrencyConverter';

export default function App() {
  return (
    // Wrapping the application (or a part of it) in the Provider
    <FixerProvider>
      <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full z-10">
          <h1 className="text-4xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            Financial Tools
          </h1>
          <p className="text-slate-400 text-center mb-8">
            Live currency exchange rates powered by Fixer
          </p>
          
          {/* Rendering the Converter Component */}
          <CurrencyConverter />
          
        </div>
      </div>
    </FixerProvider>
  );
}