import { createFileRoute } from "@tanstack/react-router";
import { ResetPasswordForm } from "@neondatabase/neon-js/auth/react/ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const Route = createFileRoute("/auth/reset-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full flex items-center justify-center pt-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter a new password, and then you will be redirected so you can
            login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm
            localization={{ NEW_PASSWORD_PLACEHOLDER: "" }}
            className="w-md"
            classNames={{
              button: "text-xs",
              input: "text-xs tracking-wide",
              label: "text-xs tracking-wide font-normal",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
