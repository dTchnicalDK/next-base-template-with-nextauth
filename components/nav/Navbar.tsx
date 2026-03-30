"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, LogOut, Settings, AirplayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavMenuItem from "./nav-menu-item";
import { navbarData } from "./navBarData.constants";
import Image from "next/image";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [initials, setInitials] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) return;

    if (user.name) {
      setInitials(
        user.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
      );
    } else if (user.email) {
      setInitials(user.email[0].toUpperCase());
    }
  }, [user]);

  const handle =
    "@" + (user?.name?.toLowerCase().replace(/\s+/g, "") ?? "user");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
            <Image
              src={navbarData?.logoLink ?? "/globe.svg"}
              alt="logo"
              width={16}
              height={16}
            />
          </div>
          <span className="text-lg font-bold">
            {navbarData?.siteTitle ?? "DemoSiteName"}
          </span>
        </Link>

        <div className="flex justify-between items-center gap-5">
          <div>
            <NavMenuItem />
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )
              ) : (
                <span className="h-4 w-4" />
              )}
            </Button>

            {status === "loading" && (
              <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
            )}

            {status === "authenticated" && user && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="rounded-full ring-2 ring-transparent transition hover:ring-primary focus-visible:outline-none focus-visible:ring-primary">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name ?? ""}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuGroup>
                    <div className="flex items-center gap-2 px-2 py-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={user.image ?? undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-bold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {handle}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={() => router.push("/dashboard/user/settings")}
                  >
                    <Settings size={14} />
                    User settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/dashboard" className="flex gap-2 items-center">
                      <AirplayIcon size={14} />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    <LogOut size={14} />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {status === "unauthenticated" && (
              <Button
                size="sm"
                className="rounded-full px-5 font-semibold"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
