import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function UserInfo() {
  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        <Avatar size="lg">
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
        <p className="flex flex-col text-xs">
          Cory Hayes
          <span className="text-white/30">cory@app-tracker.com</span>
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8">
            <EllipsisVertical className="hover:cursor-pointer" size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Signout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
