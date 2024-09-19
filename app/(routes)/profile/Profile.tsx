"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import UploadAvatar from "./UploadAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast"; // Importing the custom toast hook

interface ProfileProps {
  token: string;
}

const Profile: React.FC<ProfileProps> = ({ token }) => {
  interface User {
    username: string;
    email: string;
    avatarUrl: string | null;
    id: number;
    createdAt: string;
    // Add more properties if needed
  }
  
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    avatarUrl: null,
    id: 0,
    createdAt: "",
  });
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading
  const backEnd = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const getProfileData = async () => {
      try {
    
        const { data } = await axios.get(`${backEnd}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        setIsUserUpdated(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast({
          title: "Error fetching profile",
          description: error.response?.data?.error?.message || error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };
    getProfileData();
  }, [token, isUserUpdated]);

  // Render the skeleton while loading
  if (loading) {
    return (
      <div className="flex items-center gap-8 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto mt-8">
        <Skeleton className="rounded-full w-32 h-32" />
        <div className="flex-grow space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[60vh]">
      <div className="flex items-center gap-8 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto mt-8">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <div className="avatar-wrapper">
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${user.avatarUrl ?? ""}`}
                alt={`${user.username} avatar`}
                className="rounded-full w-32 h-32 object-cover"
              />
            ) : (
              <IoPersonCircleOutline size={128} className="text-gray-500" />
            )}
            <div className="mt-4">
              <UploadAvatar
                token={token}
                userId={user.id}
                username={user.username}
                avatarUrl={user.avatarUrl ?? ""}
                setIsUserUpdated={setIsUserUpdated} // Update after avatar changes
              />
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold mb-2">Tu información</h2>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Nombre: </span>
            {user.username || "N/A"}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Correo: </span>
            {user.email || "N/A"}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Cuenta creada el: </span>
            {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
