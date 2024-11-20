import { useContext, useEffect } from 'react';
import { getProfile } from '../api';
import AuthContext from '../contexts/AuthContext';

function useProfile() {
  const { isAuthenticated, user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      getProfile().then((data) => {
        setUser(data);
      });
    }
  }, [isAuthenticated]);

  return { profile: user };
}

export default useProfile;
