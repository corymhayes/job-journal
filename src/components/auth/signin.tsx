import { GithubLogoIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
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
import ForgotPassword from "./forgot-password";
import { toast } from "sonner";

interface SigninProps {
  children?: ReactNode;
}

function Signin({ children }: SigninProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await authClient.signIn.email({
        email,
        password,
      });

      if (data?.user) {
        navigate({
          to: "/app",
        });
      }
    } catch {
      toast.error("Unable to sign in");
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
      toast.error("Unable to sign in with Github");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-96">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Sign in with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleGitHubSignIn(e)}>
            <FieldGroup className="mb-6">
              <Field>
                <Button variant="outline" type="submit">
                  <GithubLogoIcon weight="fill" />
                  Sign in with Github
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <form onSubmit={(e) => handleSignin(e)}>
            <FieldGroup>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
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
                <div className="flex justify-end my-2">
                  <ForgotPassword />
                </div>
              </Field>
              <Field className="flex flex-col gap-4">
                <Button type="submit">Login</Button>
                {children}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signin;
