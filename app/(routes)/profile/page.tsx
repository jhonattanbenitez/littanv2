"use client";
import React, { useEffect, useState } from "react";
import Profile from "./Profile"; // Import the Profile component
import { toast } from "@/hooks/use-toast"; // Importing the custom toast hook
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const router = useRouter()
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");

    if (jwtToken) {
      setToken(jwtToken);
    } else {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to view this page.",
        variant: "destructive",
      });
    }

    setIsLoading(false); // Stop loading after token check
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="text-center">
        <p>You must log in to view this page.</p>
        <Button onClick={() => router.push('/login')} >Login</Button>
      </div>
    );
  }

  return <Profile token={token} />;
};

export default ProfilePage;
