import { useState } from 'react';

const useAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const useStoreClub = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authToken = useAuthToken();

  const storeClub = async (clubData, logoFile) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', clubData.name);
    formData.append('address', clubData.address);
    formData.append('contact_info', clubData.contact_info || '');
    formData.append('email', clubData.email);
    if (clubData.president_user_id) {
      formData.append('president_user_id', clubData.president_user_id);
    }
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/dashboard/clubs', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          // 'Content-Type': 'multipart/form-data' is not needed here, as it's set automatically with the correct boundary when using FormData
        },
        body: formData,
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

  return { storeClub, isLoading, error };
};
