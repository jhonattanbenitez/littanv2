"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UploadAvatar = ({
  userId,
  token,
  username,
  avatarUrl,
  setIsUserUpdated,
}: {
  userId: number;
  token: string;
  username: string;
  avatarUrl: string;
  setIsUserUpdated: (updated: boolean) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // For controlling modal state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const { type } = files[0];
      if (type === "image/png" || type === "image/jpeg") {
        setFile(files[0]);
      } else {
        toast({
          title: "Error",
          description: "Only PNG and JPEG image types are allowed.",
          variant: "destructive",
        });
      }
    }
  };

  const updateUserAvatarId = async (avatarId: number, avatarUrl: string) => {
    try {
      await axios.put(
        `http://localhost:1337/api/users/${userId}`,
        { avatarId, avatarUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsUserUpdated(true);
      toast({
        title: "Success",
        description: "Avatar updated successfully!",
      });
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast({
        title: "Error",
        description: "Failed to update avatar.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("name", `${username} avatar`);

      const response = await axios.post(
        `http://localhost:1337/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { id, url } = response.data[0];
      await updateUserAvatarId(id, url);

      setFile(null);
      setOpen(false); // Close the modal on success
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "File upload failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>{avatarUrl ? "Change" : "Upload"} Avatar</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{avatarUrl ? "Change" : "Upload"} Avatar</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="file">Upload File</Label>
            <Input
              type="file"
              id="file"
              onChange={handleFileChange}
              disabled={loading}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadAvatar;
