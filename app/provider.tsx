"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { UserDetailsContext } from "@/context/UserDetailsContext";

export type userDetail = {
  name: string;
  email: string;
  credits: number;
};

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userDetail, setUserDetail] = useState<any>();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) return;
    if (!user) return;
    if (hasCreatedUser.current) return;

    hasCreatedUser.current = true;

    const create = async () => {
      try {
        const result = await axios.post("/api/users");
        console.log(result.data);
        setUserDetail(result.data);
      } catch (err) {
        console.error("Create user failed", err);
      }
    };

    create();
  }, [isLoaded, isSignedIn, user?.id]);

  return (
    <div>
      <UserDetailsContext.Provider value={{ userDetail, setUserDetail }}>
        {children}
      </UserDetailsContext.Provider>
    </div>
  );
}

export default Provider;
