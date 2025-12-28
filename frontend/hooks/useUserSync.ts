"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export const useUserSync = () => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    const sync = async () => {
      const token = await getToken();
      await fetch("http://localhost:4000/api/users/sync", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };
  },[isSignedIn]);
};
