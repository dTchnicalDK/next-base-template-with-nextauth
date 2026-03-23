import { auth } from "@/auth";
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
        <div>
          <Image
            src={session.user?.image ?? ""}
            alt="usrPhoto"
            width={200}
            height={250}
            className="rounded-full overflow-hidden"
          />
        </div>
        <h1>welcome Mr. {session.user?.name}</h1>
      </div>
    </div>
  );
};

export default DashboardPage;
