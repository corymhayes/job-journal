import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "../ui/dropdown-menu";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TrashSimpleIcon } from "@phosphor-icons/react";

interface DeleteAlertProps {
  onClose?: () => void;
  rowId: string;
}

export function DeleteAlert({ onClose, rowId }: DeleteAlertProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation<Response, Error, string>({
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

  const handleCancel = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleDelete = async () => {
    try {
      await toast
        .promise(
          mutation.mutateAsync(rowId), // pass the promise directly
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

      setIsOpen(false);
      onClose?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <AlertDialogTrigger asChild>
          <Button
            variant="link"
            className="p-0 m-0 h-auto w-full justify-start hover:no-underline text-destructive"
          >
            <TrashSimpleIcon />
            Delete
          </Button>
        </AlertDialogTrigger>
      </DropdownMenu>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            application from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
