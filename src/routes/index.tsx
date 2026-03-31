import Signin from "@/components/auth/signin";
import Signup from "@/components/auth/signup";
import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/worker/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    const { data, error } = await authClient.getSession();

    if (data?.session) {
      throw redirect({
        to: "/app",
      });
    }

    if (error) {
      console.log(error);
    }
  },
});

function Home() {
  const [selectedTab, setSelectedTab] = useState("signin");

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Tabs value={selectedTab} className="w-96">
        <TabsList>
          <TabsTrigger value="signin" onClick={() => setSelectedTab("signin")}>
            Sign in
          </TabsTrigger>
          <TabsTrigger value="signup" onClick={() => setSelectedTab("signup")}>
            Sign up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Signin>
            <FieldDescription className="text-center">
              Don't have an account?
              <Button
                type="button"
                variant="link"
                className="pl-1 cursor-pointer"
                onClick={() => setSelectedTab("signup")}
              >
                Sign up
              </Button>
            </FieldDescription>
          </Signin>
        </TabsContent>
        <TabsContent value="signup">
          <Signup>
            <FieldDescription className="text-center">
              Already have an account?
              <Button
                type="button"
                variant="link"
                className="pl-1 cursor-pointer"
                onClick={() => setSelectedTab("signin")}
              >
                Sign in
              </Button>
            </FieldDescription>
          </Signup>
        </TabsContent>
      </Tabs>
    </div>
  );
}
