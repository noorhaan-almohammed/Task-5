import { useCallback } from "react";
import { AuthRepository } from "../repositories/AuthRepository";
import { useAuthContext } from "../context/AuthContext";

const authRepo = new AuthRepository();

export function useAuth() {
  const { setUser } = useAuthContext();

  const register = useCallback(
    async (data: any) => {
      const user = await authRepo.register(data);
      setUser(user);
      return user;
    },
    [setUser]
  );

  const login = useCallback(
    async (data: any) => {
      const user = await authRepo.login(data);
      setUser(user);
      return user;
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    authRepo.logout();
  }, [setUser]);
  const getToken = useCallback(authRepo.getToken.bind(authRepo), []);

  return {
    register,
    login,
    logout,
    getToken,
  };
}
