import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserInfo } from "./user-info";
import type { Application } from "@/applicationSchema";
import type { User } from "@/types/User";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { XIcon } from "@phosphor-icons/react";

const ApplicationForm = lazy(() =>
  import("./application-form").then((m) => ({ default: m.ApplicationForm }))
);

interface SidebarLayoutProps {
  selectedApplication?: Application;
  onClearSelection?: () => void;
  userData?: User;
}

export function SidebarLayout({
  selectedApplication,
  onClearSelection,
  userData,
}: SidebarLayoutProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <>
      <Sidebar side="left" className="flex justify-center" variant="sidebar">
        <div className="absolute right-5 top-5">
          <XIcon
            weight="bold"
            size={16}
            className="sm:hidden"
            onClick={toggleSidebar}
          />
        </div>
        <div className="w-full flex justify-evenly py-6">
          <img src="logo-alt.png" className="w-32" alt="job journal logo" />
        </div>
        <SidebarContent className="px-6 pb-6">
          <Suspense fallback={<Skeleton className="h-96 w-full rounded-md" />}>
            <ApplicationForm
              key={selectedApplication?.id ?? "new"}
              application={selectedApplication}
              onClearSelection={onClearSelection}
            />
          </Suspense>
        </SidebarContent>
        <SidebarFooter className="flex flex-row justify-between items-center py-4 border-t">
          {userData && <UserInfo userData={userData} />}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
