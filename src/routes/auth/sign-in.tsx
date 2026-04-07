import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent,
  beforeLoad: () => {
    throw redirect({
      to: "/",
    });
  },
});

function RouteComponent() {
  return <div></div>;
}
