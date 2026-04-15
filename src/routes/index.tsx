import Signin from "@/components/auth/signin";
import Signup from "@/components/auth/signup";
import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { authClient } from "@/worker/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    const { data } = await authClient.getSession();

    if (data?.session) {
      throw redirect({
        to: "/app",
      });
    }
  },
});

function Home() {
  const [selectedTab, setSelectedTab] = useState("signin");

  return (
    <div className="grid grid-rows-3 grid-cols-1 w-screen h-screen items-center">
      <div className="flex items-center gap-2 justify-center">
        {/*<ReadCvLogoIcon weight="fill" size={32} />
        <p className="font-bold tracking-tight text-3xl">Job Journal</p>*/}
        <img src="logo-alt.png" className="w-48" alt="job journal logo" />
      </div>
      <Tabs value={selectedTab}>
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
