import React, { createContext, useState  , useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  //for login
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
        setUser(result.user);
        navigate("/", { replace: true });
        console.log(`Logged in ${result.user.name}`);
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // check if the user is logged in.
  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        if (
          location.pathname === "/signin" ||
          location.pathname === "/signup"
        ) {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 100);
        } else {
          navigate(location.pathname ? location.pathname : "/");
        }
        setUser(result);
      } else {
        navigate("/signin", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // for register
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
        console.log("user registered successfully! login into your account!");
        navigate("/signin", { replace: true });
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
