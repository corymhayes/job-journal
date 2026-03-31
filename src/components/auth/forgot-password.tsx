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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handlePassword = async () => {
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "http://localhost:5173/auth/reset-password",
    });

    if (error) {
      console.log(error.message);
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
        <form onSubmit={handlePassword} className="flex flex-col gap-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
