import { useState, useEffect } from 'react';

export function useClubs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const bearerToken = localStorage.getItem('authToken'); 

    if (bearerToken) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`, 
      };

      fetch('http://127.0.0.1:8000/dashboard/clubs', { headers })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error: ' + response.status);
          }
        })
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    } else {
      setError('No auth token found');
      setLoading(false);
    }
  }, []); 

  return { data, loading, error };
}
