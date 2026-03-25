import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../theme-toggle";

export function UserInfo() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row gap-2 items-center w-full">
            <Avatar size="lg">
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
            <p className="flex flex-col text-xs">
              Cory Hayes
              <span className="text-white/30">cory@app-tracker.gg</span>
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="max-w-48 mb-2">
          <ModeToggle />
          <DropdownMenuItem>Signout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
