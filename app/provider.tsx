"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { userDetailsContext } from "@/context/userDetailsContext";
export type UserDetails = {
  name: string;
  email: string;
  credits: number;
};

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [UserDetails, setUserDetails] = useState<any>();

  useEffect(() => {
    user && createNewUser();
  }, [user]);

  const createNewUser = async () => {
    const result = await axios.post("/api/users");
    console.log(result.data);
    setUserDetails(result.data);
  };

  return (
    <div>
      <userDetailsContext.Provider value={{ UserDetails, setUserDetails }}>
        {children}
      </userDetailsContext.Provider>
    </div>
  );
}

export default Provider;
