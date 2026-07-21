import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);


  // Check logged in user when app loads
  useEffect(() => {

    const getCurrentUser = async () => {

      if (!token) {
        setLoading(false);
        return;
      }

      try {

        const response = await fetch(
          "http://localhost:3000/api/login/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const data = await response.json();


        if(response.ok){
          setUser(data);
        }
        else{
          logout();
        }


      } catch(error){

        console.log(error);

      } finally {

        setLoading(false);

      }

    };


    getCurrentUser();

  }, [token]);



  // Login function
  const login = (newToken) => {

  
    localStorage.setItem("token", newToken);
  
    setToken(newToken);
  
  };



  // Logout function
  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);
    setUser(null);

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};