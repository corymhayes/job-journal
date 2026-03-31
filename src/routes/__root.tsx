import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import type { QueryClient } from "@tanstack/react-query";
import { authClient } from "../worker/auth";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent on a root route</p>
        <Link to="/">Home</Link>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <NeonAuthUIProvider
      authClient={authClient}
      social={{ providers: ["github"] }}
    >
      <Outlet />
    </NeonAuthUIProvider>
  );
}
