import { createContext, ReactNode, useState } from 'react';
import { AuthResponse, User } from '../types';

const initialValue = {
  user: undefined,
  setUser: () => {},
  isAuthenticated: false,
  setAuthenticated: () => {},
  login: () => {},
  logout: () => {},
};
const AuthContext = createContext<{
  user: User | undefined;
  setUser: Function;
  isAuthenticated: boolean;
  setAuthenticated: Function;
  login: Function;
  logout: Function;
}>(initialValue);

const hasAccesstoken = !!localStorage.getItem('accessToken');

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setAuthenticated] = useState<boolean>(hasAccesstoken);

  const login = (response: AuthResponse) => {
    localStorage.setItem(
      'accessToken',
      `${response.encData}.${response.hashData}`
    );
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
