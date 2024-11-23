import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const loginUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:8000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (!result.error) {
        localStorage.setItem("token", result.token);
        navigate("/", { replace: true });
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // register request.
  const registerUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();

      if (!result.error) {
        toast.success("user registered successfully! login into your account!");
        navigate("/signin", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
