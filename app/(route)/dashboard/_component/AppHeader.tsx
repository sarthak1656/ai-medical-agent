import { UserButton } from "@clerk/nextjs";
import { StethoscopeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Import Link
import React from "react";

function AppHeader() {
  const menuOptions = [
    {
      id: 1,
      name: "Home",
      path: "/dashboard", // Updated to common dashboard home path
    },
    {
      id: 2,
      name: "History",
      path: "/dashboard/history",
    },
    // {
    //   id: 3,
    //   name: "Pricing",
    //   path: "/pricing",
    // },
    // {
    //   id: 4,
    //   name: "Profile",
    //   path: "/profile",
    // },
  ];

  return (
    <div className="flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 p-2">
          <StethoscopeIcon className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-lg font-bold tracking-tight md:text-2xl">
          MediVox AI
        </h1>
      </Link>{" "}
      <div className="hidden md:flex gap-12 items-center">
        {menuOptions.map((option) => (
          <Link href={option.path} key={option.id}>
            {" "}
            {/* Wrap in Link */}
            <h2 className="hover:font-bold cursor-pointer transition-all">
              {option.name}
            </h2>
          </Link>
        ))}
      </div>
      <UserButton />
    </div>
  );
}

export default AppHeader;
