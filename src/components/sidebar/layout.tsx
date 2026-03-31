import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ApplicationForm } from "./application-form";
import { UserInfo } from "./user-info";
import type { Application } from "@/applicationSchema";
import type { User } from "@/types/User";

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
  return (
    <Sidebar side="right" className="flex justify-center" variant="sidebar">
      <SidebarContent className="p-6">
        <ApplicationForm
          key={selectedApplication?.id ?? "new"}
          application={selectedApplication}
          onClearSelection={onClearSelection}
        />
      </SidebarContent>
      <SidebarFooter className="flex flex-row justify-between items-center p-6">
        {userData && <UserInfo userData={userData} />}
      </SidebarFooter>
    </Sidebar>
  );
}
