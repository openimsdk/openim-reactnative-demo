import { createContext, useContext } from "react";


interface AuthContextType {
  isLoggedIn: boolean;
  setLoginState: (state: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setLoginState: () => {},
});

export const useAuth = () => useContext(AuthContext)