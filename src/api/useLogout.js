import { useState } from 'react';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/dashboard/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      localStorage.removeItem('authToken');
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      return false;
    }
  };

  return { logout, isLoading, error };
};
