import { useState, useEffect } from 'react';

export function usePresidents(shouldFetch) {
  const [presidents, setPresidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (shouldFetch) {
      setLoading(true);
      const bearerToken = localStorage.getItem('authToken');

      if (bearerToken) {
        const headers = {
          'Authorization': `Bearer ${bearerToken}`,
        };

        fetch('http://127.0.0.1:8000/dashboard/get-presidents', { headers })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error: ' + response.status);
            }
          })
          .then(responseData => {
            setPresidents(responseData.data);
          })
          .catch(error => {
            setError(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setError('No auth token found');
        setLoading(false);
      }
    }
  }, [shouldFetch]);

  return { presidents, loading, error };
}
