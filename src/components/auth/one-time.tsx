import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { authClient } from "../../worker/auth";

interface OneTimeProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  email: string;
}

export default function OneTime({ open, setOpen, email }: OneTimeProps) {
  const navigate = useNavigate();
  const [otpInput, setOtpInput] = useState("");

  const handleOtp = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { data } = await authClient.emailOtp.verifyEmail({
      email,
      otp: otpInput,
    });

    if (data?.user) {
      navigate({
        to: "/app",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      {/*<DialogTrigger
        type="button"
        className="font-normal cursor-pointer decoration-foreground text-xs hover:underline"
      >
        Forgot your password?
      </DialogTrigger>*/}
      <DialogContent className="h-64 w-80">
        <DialogHeader>
          <DialogTitle>Verify your login</DialogTitle>
          <DialogDescription>
            Use the code provided in the email to verify your email address.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => handleOtp(e)} className="flex flex-col gap-7">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otpInput">Verification Code</FieldLabel>
              <InputOTP
                maxLength={6}
                value={otpInput}
                onChange={(value) => setOtpInput(value)}
              >
                <InputOTPGroup className="flex w-full justify-between">
                  <InputOTPSlot index={0} className="border size-10" />
                  <InputOTPSlot index={1} className="border size-10" />
                  <InputOTPSlot index={2} className="border size-10" />
                  <InputOTPSlot index={3} className="border size-10" />
                  <InputOTPSlot index={4} className="border size-10" />
                  <InputOTPSlot index={5} className="border size-10" />
                </InputOTPGroup>
              </InputOTP>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button>Verify</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
