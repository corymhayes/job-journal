import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ApplicationForm } from "./application-form";
import { UserInfo } from "./user-info";
import type { Application } from "@/applicationSchema";
import type { User } from "@/types/User";
import { Logo } from "../branding/logo";

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
    <Sidebar side="left" className="flex justify-center" variant="sidebar">
      <div className="w-full flex justify-center mt-5">
        <img src="logo-alt.png" className="w-32" alt="job journal logo" />
      </div>
      <SidebarContent className="p-6">
        <ApplicationForm
          key={selectedApplication?.id ?? "new"}
          application={selectedApplication}
          onClearSelection={onClearSelection}
        />
      </SidebarContent>
      <SidebarFooter className="flex flex-row justify-between items-center py-4 border-t">
        {userData && <UserInfo userData={userData} />}
      </SidebarFooter>
    </Sidebar>
  );
}
