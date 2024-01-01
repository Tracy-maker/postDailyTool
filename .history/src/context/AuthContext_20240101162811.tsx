import { getCurrentUser } from "@/lib/appwrite/api";
import { IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();

  const checkAuthUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []); // 添加必要的依赖项，如果没有则保留空数组
  

  useEffect(() => {
    async function handleAuthentication() {
      setIsLoading(true);
  
      // 检查 localStorage 中的 cookieFallback
      const cookieFallback = localStorage.getItem("cookieFallback");
  
      // 如果 cookieFallback 存在且不为空，尝试验证用户
      if (cookieFallback && cookieFallback !== "[]") {
        try {
          const isAuthenticated = await checkAuthUser();
          if (!isAuthenticated) {
            navigate("/sign-in");
          }
        } catch (error) {
          console.error(error);
          navigate("/sign-in");
        }
      } else {
        // 如果 cookieFallback 不存在或为空，且当前不在登录页面，重定向到登录页面
        if (!window.location.pathname.includes("sign-in")) {
          navigate("/sign-in");
        }
      }
  
      setIsLoading(false);
    }
  
    handleAuthentication();
  }, [navigate, checkAuthUser]);
  

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
