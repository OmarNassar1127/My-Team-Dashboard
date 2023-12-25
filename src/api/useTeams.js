import { useState, useEffect } from 'react';

export function useTeams() {
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

      const fetchData = () => {
        fetch('http://127.0.0.1:8000/dashboard/teams', { headers })
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
      };
      fetchData();
      const intervalId = setInterval(fetchData, 5000); 
      return () => {
        clearInterval(intervalId); 
      };
    } else {
      setError('No auth token found');
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}