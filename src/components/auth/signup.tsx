import { GithubLogoIcon } from "@phosphor-icons/react";
import { type FormEvent, type ReactNode, useState } from "react";
import { authClient } from "../../worker/auth";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field";
import { Input } from "../ui/input";
import OneTime from "./one-time";
import { toast } from "sonner";

interface SignupProps {
  children?: ReactNode;
}
function Signup({ children }: SignupProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openOneTime, setOpenOneTime] = useState(false);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const name = `${firstName} ${lastName}`;

    const { data } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (data?.user) {
      setOpenOneTime(true);
    }
  };

  const handleGitHubSignIn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/app",
      });
    } catch {
      toast.error("Unable to sign up with Github");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-96">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome!</CardTitle>
          <CardDescription>
            Sign up with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleGitHubSignIn(e)}>
            <FieldGroup className="mb-6">
              <Field>
                <Button variant="outline" type="submit">
                  <GithubLogoIcon weight="fill" />
                  Sign up with Github
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <form onSubmit={(e) => handleSignup(e)}>
            <FieldGroup>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <div className="flex gap-4">
                <Field>
                  <FieldLabel htmlFor="first_name">First name</FieldLabel>
                  <Input
                    id="first_name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="last_name">Last name</FieldLabel>
                  <Input
                    id="last_name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Field>
              </div>
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
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              <Field className="flex flex-col gap-4">
                <Button type="submit">Sign up</Button>
                {children}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <OneTime open={openOneTime} setOpen={setOpenOneTime} email={email} />
    </div>
  );
}

export default Signup;
