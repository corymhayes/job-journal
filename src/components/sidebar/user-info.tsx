import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { authClient } from "../../worker/auth";
import { ModeToggle } from "../theme-toggle";
import { useNavigate } from "@tanstack/react-router";
import type { User } from "../../types/User";
import type { FormEvent } from "react";

export function UserInfo({ userData }: { userData: User }) {
  const navigate = useNavigate();

  const handleSignout = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await authClient.signOut();

    if (!error) {
      navigate({
        to: "/",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row gap-2 items-center w-full">
          <Avatar>
            <AvatarImage src={userData.image ?? undefined} />
            <AvatarFallback>{userData.name.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <p className="flex flex-col text-xs">
            {userData.name}
            <span className="text-white/30">{userData.email}</span>
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-w-48 mb-2">
        <ModeToggle />
        <DropdownMenuItem onClick={(e) => handleSignout(e)}>
          Signout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
