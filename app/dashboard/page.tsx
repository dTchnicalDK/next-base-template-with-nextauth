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
      Dashboard page
      <div>
        <div className="relative w-36 h-36">
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
        <form action={handleLogOut}>
          <Button type="submit">signOut</Button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
