import { createContext, useContext } from "react";


interface AuthContextType {
  isLoggedIn: boolean;
  setLoginState: (state: boolean) => void;
  handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setLoginState: () => {},
  handleLogout: async () => {},
});

export const useAuth = () => useContext(AuthContext)