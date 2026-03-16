import React, { useState } from 'react';
import { useFixer } from '../context/FixerContext';

export default function CurrencyConverter() {
  const { rates, loading, error } = useFixer();
  const [amount, setAmount] = useState(1);
  const [targetCurrency, setTargetCurrency] = useState('USD');

  // Calculate the converted amount based on the selected target currency
  const convertedAmount = rates[targetCurrency] 
    ? (amount * rates[targetCurrency]).toFixed(2) 
    : 0;

  return (
    <div className="p-6 max-w-md mx-auto bg-slate-900 rounded-xl shadow-lg border border-slate-800 text-white mt-10">
      <h2 className="text-2xl font-bold text-cyan-400 text-center mb-1">Currency Exchange</h2>
      <p className="text-sm text-slate-400 text-center mb-6">Base: EUR (Free Tier)</p>
      
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      
      {loading ? (
        <p className="text-center text-slate-300 animate-pulse">Loading live rates...</p>
      ) : (
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Amount (EUR)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Convert To</label>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2 p-5 bg-slate-950 border border-slate-800 rounded-lg text-center">
            <p className="text-lg font-medium text-slate-300">
              {amount} EUR = <br/>
              <span className="text-3xl font-bold text-cyan-400 block mt-2">
                {convertedAmount} {targetCurrency}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}