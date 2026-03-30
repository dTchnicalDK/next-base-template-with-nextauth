"use client";
import React from "react";
import { navbarData, NavMenuItems } from "./navBarData.constants";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const NavMenuItem = () => {
  const menuItem = navbarData.navMenu;
  const currentPath = usePathname();

  return (
    <div className="md:min-w-60 flex justify-around items-center gap-5">
      {menuItem &&
        menuItem.map((item, index) => (
          <Link href={item.navLink} key={index}>
            <Button
              variant="outline"
              className={`hover:text-lg hover:px-4 px-5 cursor-pointer ${currentPath === item.navLink ? "text-orange-500" : ""}`}
            >
              <h1 className="capitalize">{item.navName}</h1>{" "}
            </Button>
          </Link>
        ))}
    </div>
  );
};

export default NavMenuItem;
