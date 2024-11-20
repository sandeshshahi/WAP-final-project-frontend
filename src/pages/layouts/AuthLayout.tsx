import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const AuthLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <div>You are forbidden</div>;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;