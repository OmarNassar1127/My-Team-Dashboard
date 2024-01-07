import { useState } from 'react';

const useAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const useStorePresident = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authToken = useAuthToken();

    const storePresident = async (presidentData) => {
      setIsLoading(true);
      setError(null);

      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      const body = JSON.stringify({
        first_name: presidentData.first_name,
        last_name: presidentData.last_name,
        email: presidentData.email,
        password: presidentData.password,
        address: presidentData.address,
        phone_number: presidentData.phone_number
      });

      try {
        const response = await fetch('http://127.0.0.1:8000/dashboard/presidents', {
          method: 'POST',
          headers: headers,
          body: body,
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

    return { storePresident, isLoading, error };
  };

export default useStorePresident;
