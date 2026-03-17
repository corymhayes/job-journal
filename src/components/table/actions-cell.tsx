import { useState } from "react";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
// import type { Application } from "@/types/Application";
import type { Application } from "@/applicationSchema";
import { DeleteAlert } from "./delete-alert";
import { PencilSimpleIcon, DotsThreeIcon } from "@phosphor-icons/react";

export function ActionsCell({
  row,
  onEdit,
}: {
  row: Row<Application>;
  onEdit: (application: Application) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8">
          <DotsThreeIcon weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(row.original)}>
          <PencilSimpleIcon size={8} />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={(e) => e.preventDefault()}
        >
          <DeleteAlert
            onClose={() => setIsOpen(false)}
            rowId={row.getValue("id")}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
