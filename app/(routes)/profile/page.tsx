"use client";
import React, { useEffect, useState } from "react";
import Profile from "./Profile"; // Import the Profile component
import Login from "./Login"; // Import Login component
import Register from "./Register"; // Import Register component
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      setToken(jwtToken);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-full max-w-md space-y-6">
          {isLogin ? (
            <>
              <Login setToken={setToken} />
              <p className="text-center mt-4">
                ¿No tienes una cuenta?{" "}
                <Button
                  variant="link"
                  className="text-blue-600"
                  onClick={() => setIsLogin(false)}
                >
                  Registrarse
                </Button>
              </p>
            </>
          ) : (
            <>
              <Register setIsLogin={setIsLogin} />
              <p className="text-center mt-4">
                ¿Ya tienes una cuenta?{" "}
                <Button
                  variant="link"
                  className="text-blue-600"
                  onClick={() => setIsLogin(true)}
                >
                  Acceder
                </Button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return <Profile token={token} />;
};

export default ProfilePage;
