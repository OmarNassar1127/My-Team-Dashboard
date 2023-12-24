import React, { useState } from 'react';
import { Dialog, Button, Typography } from "@material-tailwind/react";
import { useLogout } from '../../api/useLogout';
import { useNavigate } from 'react-router-dom';

export function SignOut() {
  const [open, setOpen] = useState(true); 
  const { logout, isLoading, error } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/sign-in');
      window.location.reload();
    } catch (e) {
      console.error('Logout failed', e);
      setOpen(false); 
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/'); 
  };

  return (
    <Dialog size="sm" open={open} handler={handleClose}>
      <div className="p-4">
        <Typography variant="h5" className="mb-4">
          Sign Out
        </Typography>
        <Typography variant="paragraph">
          Are you sure you want to sign out?
        </Typography>
        <div className="mt-4 flex justify-end gap-2">
          <Button 
            color="blueGray" 
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            color="red" 
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Confirm'}
          </Button>
        </div>
        {error && <Typography color="red">{error}</Typography>}
      </div>
    </Dialog>
  );
}

export default SignOut;
