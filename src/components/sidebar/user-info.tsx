import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { authClient } from "@/worker/auth";
import { ModeToggle } from "../theme-toggle";
import { useNavigate } from "@tanstack/react-router";
import type { User } from "../../types/User";
import type { FormEvent } from "react";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

export function UserInfo({ userData }: { userData: User }) {
  const navigate = useNavigate();

  const handleSignout = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Failed to sign out");
        return;
      }

      navigate({ to: "/" });
    } catch (err) {
      console.error("Signout error: ", err);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="px-4">
        <div className="flex items-center justify-between w-full">
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
          <DotsThreeVerticalIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-52 mb-2">
        <ModeToggle />
        <DropdownMenuItem onClick={(e) => handleSignout(e)}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
