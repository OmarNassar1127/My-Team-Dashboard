import React from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLogout } from '../../api/useLogout';
import { useNavigate } from 'react-router-dom'; 

export function SignOut() {
  const { logout, isLoading, error } = useLogout();
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      navigate('/sign-in'); 
      window.location.reload();
    }
  };

  return (
    <section className="m-8 flex flex-col items-center justify-center">
      <Typography variant="h5" className="mb-4">
        Are you sure you want to sign out?
      </Typography>
      <Button 
        onClick={handleLogout} 
        disabled={isLoading}
        color="red"
      >
        {isLoading ? 'Logging out...' : 'Sign Out'}
      </Button>
      {error && <Typography color="red">{error}</Typography>}
    </section>
  );
}

export default SignOut;
