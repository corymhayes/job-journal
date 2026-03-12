import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { Application } from "@/types/Application";

export function ActionsCell({
  row,
  onEdit,
}: {
  row: Row<Application>;
  onEdit: (application: Application) => void;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id) => {
      return await fetch(`/api/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(row.original)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            try {
              await toast
                .promise(
                  mutation.mutateAsync(row.getValue("id")), // pass the promise directly
                  {
                    loading: "Deleting...",
                    success: "Application deleted",
                    error: "Error",
                  },
                )
                .unwrap();

              await queryClient.invalidateQueries({
                queryKey: ["applications"],
              });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
