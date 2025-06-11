import { useCallback } from "react";
import { AuthRepository } from "../repositories/AuthRepository";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const authRepo = new AuthRepository();

export function useAuth() {
  const register = useCallback(authRepo.register.bind(authRepo), []);
  const login = useCallback(authRepo.login.bind(authRepo), []);
  const logout = useCallback(authRepo.logout.bind(authRepo), []);
  const getToken = useCallback(authRepo.getToken.bind(authRepo), []);
  const refreshToken = useCallback(authRepo.refreshToken.bind(authRepo), []);
  
  const navigate = useNavigate();
   useEffect(() => {
    const interval = setInterval(async () => {
      try {
        console.log("⏳ Attempting to refresh token...");
        await authRepo.refreshToken();
        console.log("✅ Token refreshed successfully");
      } catch (err) {
        console.error("❌ Failed to refresh token, logging out");
        authRepo.logout();
        navigate("/") 
      }
    }, 50*60*1000); //50 minut

    return () => clearInterval(interval); 
  }, []);

  return {
    register,
    login,
    logout,
    getToken,
    refreshToken,
  };
}
