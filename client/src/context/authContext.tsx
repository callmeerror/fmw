import axios, { AxiosInstance } from 'axios';
import React, { createContext, useContext, useState } from 'react';

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

type AuthContextType = {
  user?: IUser;
  client: AxiosInstance;
  authClient: AxiosInstance;
  setUserAndAuthClient: (user: IUser, token: string) => void;
  setAuthClient: (token: string) => AxiosInstance;
  removeUser: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const baseURL = '/api/v1';
const client = axios.create({ baseURL: baseURL });
let authClient = client;

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser>();
  const setUserAndAuthClient = (user: IUser, token: string) => {
    authClient = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem('token', token);
    setUser(user);
  };

  const setAuthClient = (token: string) => {
    authClient = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return authClient;
  };

  const removeUser = () => {
    authClient = client;
    localStorage.removeItem('token');
    setUser(undefined);
  }

  return (
    <AuthContext.Provider
      value={{ user, client, authClient, setUserAndAuthClient, setAuthClient, removeUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext) as AuthContextType;
};

export default AuthProvider;
