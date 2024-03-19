import { useEffect } from 'react';

const useRequireAuth = (redirectPath) => {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = redirectPath;
    }
  }, [redirectPath]);

  return;
};

export default useRequireAuth;
