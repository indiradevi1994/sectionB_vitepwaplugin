import React, { createContext, useContext, useState, useEffect } from 'react';

const FixerContext = createContext();

export const FixerProvider = ({ children }) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Ensure you add VITE_FIXER_API_KEY to your .env.local file
        const apiKey = import.meta.env.VITE_FIXER_API_KEY;
        const response = await fetch(`http://data.fixer.io/api/latest?access_key=${apiKey}`);
        const data = await response.json();
        
        if (data.success) {
          setRates(data.rates);
        } else {
          setError(data.error.info || "Failed to fetch exchange rates.");
        }
      } catch (err) {
        setError("A network error occurred while fetching rates.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return (
    <FixerContext.Provider value={{ rates, loading, error }}>
      {children}
    </FixerContext.Provider>
  );
};

export const useFixer = () => {
  const context = useContext(FixerContext);
  if (!context) throw new Error("useFixer must be used within a FixerProvider");
  return context;
};