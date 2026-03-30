import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { handleLogOut } from "@/lib/actions/validations/auth.action";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await auth();
  // console.log("session", session);
  if (!session) redirect("/login");
  return (
    <div>
      {/* //remove the div and designe as you want the dashboard */}
      Dashboard page
      <div className="max-w-screen flex flex-col justify-center items-center">
        <div className="relative w-36 h-36 ">
          <Image
            src={session.user?.image ?? "/profile.png"}
            alt="usrPhoto"
            fill
            className="object-cover rounded-full"
            priority
            sizes="144px"
          />
        </div>
        <h1>welcome Mr. {session.user?.name}</h1>
        <h1>welcome Mr. {session.user?.email}</h1>
      </div>
    </div>
  );
};

export default DashboardPage;
