"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast"; // Import the custom toast hook

const initialRegisterUser = { username: "", email: "", password: "" };
const backEnd = process.env.NEXT_PUBLIC_BACKEND_URL;

const Register = ({
  setIsLogin,
}: {
  setIsLogin: (isLogin: boolean) => void;
}) => {
  const [registerUser, setRegisterUser] = useState(initialRegisterUser);

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterUser((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const url = `${backEnd}/api/auth/local/register`;
      if (
        registerUser.username &&
        registerUser.email &&
        registerUser.password
      ) {
        const res = await axios.post(url, registerUser);
        if (res) {
          toast({
            title: "Success",
            description: "Registered successfully!",
            variant: "default",
          });
          setRegisterUser(initialRegisterUser);
          setIsLogin(true); // Switch to login after registration
        }
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error?.message || error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <h2 className="text-center text-3xl font-bold">Sign up</h2>
      <div className="space-y-4">
        <Input
          type="text"
          name="username"
          value={registerUser.username}
          onChange={handleRegisterChange}
          placeholder="Enter your full name"
          className="w-full"
        />
        <Input
          type="email"
          name="email"
          value={registerUser.email}
          onChange={handleRegisterChange}
          placeholder="Enter your email"
          className="w-full"
        />
        <Input
          type="password"
          name="password"
          value={registerUser.password}
          onChange={handleRegisterChange}
          placeholder="Enter password"
          className="w-full"
        />
        <Button onClick={handleRegister} className="w-full">
          Sign up
        </Button>
      </div>
    </>
  );
};

export default Register;
