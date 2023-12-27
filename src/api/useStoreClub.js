import { useState } from 'react';

const useAuthToken = () => localStorage.getItem('authToken');

export const useStoreClub = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authToken = useAuthToken();

  const storeClub = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/dashboard/clubs', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          // Content-Type is not set because FormData sets it automatically
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody.message}`);
      }

      const data = await response.json();
      setIsLoading(false);
      return data; 
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      throw error;
    }
  };

  return { storeClub, isLoading, error };
};

export default useStoreClub;
