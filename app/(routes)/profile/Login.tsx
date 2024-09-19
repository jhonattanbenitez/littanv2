"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast"; // Import the custom toast hook
import { useRouter } from "next/navigation";

const initialLoginUser = { identifier: "", password: "" };

const Login = ({ setToken }: { setToken: (token: string) => void }) => {
  const [loginUser, setLoginUser] = useState(initialLoginUser);
  const router = useRouter();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginUser((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (loginUser.identifier && loginUser.password) {
        const { data } = await axios.post(url, loginUser);
        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          toast({
            title: "Success",
            description: "Logged in successfully!",
            variant: "default",
          });
          setToken(data.jwt);
          router.push("/");
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
      <h2 className="text-center text-3xl font-bold">Login</h2>
      <div className="space-y-4">
        <Input
          type="email"
          name="identifier"
          value={loginUser.identifier}
          onChange={handleLoginChange}
          placeholder="Enter your email"
          className="w-full"
        />
        <Input
          type="password"
          name="password"
          value={loginUser.password}
          onChange={handleLoginChange}
          placeholder="Enter password"
          className="w-full"
        />
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
