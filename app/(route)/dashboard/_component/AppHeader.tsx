import { UserButton } from "@clerk/nextjs";
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
    <div className="flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40" >
      <Image src={"/logo.svg"} alt="Logo" width={180} height={90} />
      <div className="hidden md:flex gap-12 items-center">
        {menuOptions.map((option) => (
          <Link href={option.path} key={option.id}> {/* Wrap in Link */}
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