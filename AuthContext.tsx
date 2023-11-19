import { createContext, useContext } from "react";


export const AuthContext = createContext(()=>void);

export const useAuth = () => useContext(AuthContext)