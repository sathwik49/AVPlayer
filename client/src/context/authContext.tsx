import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import request from "../utils/request";
import toast from "react-hot-toast";

export const useAuthContext = () => {
  return useContext(AuthContext);
};

type AuthUserType = {
  userId: string;
  username: string;
};

export const AuthContext = createContext<{
  authUser: AuthUserType | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
  message: string;
  success: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
  message: "",
  success: false,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${request.baseUrldev}/auth/me`);
        setAuthUser(response.data.details);
        setMessage(response.data.message);
        setSuccess(response.data.success);
      } catch (error: any) {
        setMessage(error.response.data.message);
        setSuccess(error.response.data.success);
      } finally {
        setIsLoading(false);
        setTimeout(()=>{},3000)
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoading,
        message,
        success,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
