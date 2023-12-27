import { useState } from 'react';

const useAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const useStoreTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authToken = useAuthToken();

  const storeTeam = async (teamData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/dashboard/teams', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          club_id: teamData.club_id,
          name: teamData.name,
          category: teamData.category,
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

  return { storeTeam, isLoading, error };
};

export default useStoreTeam;
