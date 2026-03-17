import React, { useState } from 'react';
import { useFixer } from '../context/FixerContext';

export default function CurrencyConverter() {
  const { rates, loading, error } = useFixer();
  const [amount, setAmount] = useState(1);
  const [targetCurrency, setTargetCurrency] = useState('USD');

  const convertedAmount = rates[targetCurrency] 
    ? (amount * rates[targetCurrency]).toFixed(2) 
    : 0;

  return (
    <div className="converter-card">
      {error && <p style={{color: '#ff6b6b', textAlign: 'center'}}>{error}</p>}
      
      {loading ? (
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>Loading live rates...</p>
      ) : (
        <div className="converter-form">
          <div className="input-group">
            <label>Amount (EUR)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="custom-input"
              min="0"
            />
          </div>

          <div className="input-group">
            <label>Convert To</label>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="custom-select"
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="result-box">
            <p className="result-text">
              {amount} EUR = 
              <span className="result-amount">
                {convertedAmount} {targetCurrency}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}