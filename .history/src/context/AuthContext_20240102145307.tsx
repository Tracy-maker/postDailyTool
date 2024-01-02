import { getCurrentUser } from "@/lib/appwrite/api";
import { IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  isEmailVerified: false,
  setIsEmailVerified: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isEmailVerified: boolean;
  setIsEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const checkAuthUser = async () => {
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
  };

  const [redirectPath, setRedirectPath] = useState(null); // 新增状态用于存储重定向路径

  const checkAndSetRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");
    const expire = urlParams.get("expire");
    const verifyToken = urlParams.get("verifyToken");

    // 设置基于URL参数的重定向
    if (userId && secret && expire) {
      setRedirectPath(`/reset-password?userId=${userId}&secret=${secret}&expire=${expire}`);
    } else if (verifyToken) {
      setRedirectPath(`/verify-email?token=${verifyToken}`);
    } else {
      const isAuthenticated = await checkAuthUser();
      // 设置基于认证状态的重定向
      setRedirectPath(isAuthenticated ? "/" : "/sign-up");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkAndSetRedirect().catch(error => {
      console.error(error);
      setRedirectPath("/sign-in");  // 出错时重定向到登录页面
    }).finally(() => setIsLoading(false));
  }, [navigate, checkAuthUser]);

  useEffect(() => {
    // 当 redirectPath 改变且非空时执行重定向
    if (redirectPath) {
      navigate(redirectPath);
    }
  }, [navigate, redirectPath]);
  

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    isEmailVerified,
    setIsEmailVerified,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
