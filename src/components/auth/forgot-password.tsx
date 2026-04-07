import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { authClient } from "../../worker/auth";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [rp_email, setRPEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { error } = await authClient.requestPasswordReset({
      email: rp_email,
      redirectTo: "http://localhost:5173/auth/reset-password",
    });

    if (error) {
      toast.error(error.message);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        type="button"
        className="font-normal cursor-pointer decoration-foreground text-xs hover:underline"
      >
        Forgot your password?
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot your passsword?</DialogTitle>
          <DialogDescription>
            Enter the email that was used to sign up, and if found, a link to
            reset your password will be sent.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => handlePassword(e)}
          className="flex flex-col gap-7"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="rp_email">Email</FieldLabel>
              <Input
                type="email"
                placeholder="m@example.com"
                value={rp_email}
                onChange={(e) => setRPEmail(e.target.value)}
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Send reset</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
