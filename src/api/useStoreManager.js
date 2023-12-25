import { useState } from 'react';

const useAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const useStoreManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authToken = useAuthToken();

  const storeManager = async (presidentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/dashboard/managers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: presidentData.name,
          email: presidentData.email,
          password: presidentData.password,
          address: presidentData.address,
          phone_number: presidentData.phone_number
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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

  return { storeManager, isLoading, error };
};

export default useStoreManager;
