import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ApplicationForm } from "./application-form";
import { UserInfo } from "./user-info";
import type { Application } from "@/types/Application";

interface SidebarLayoutProps {
  selectedApplication?: Application;
  onClearSelection?: () => void;
}

export function SidebarLayout({
  selectedApplication,
  onClearSelection,
}: SidebarLayoutProps) {
  return (
    <Sidebar side="right" className="flex justify-center">
      <SidebarContent className="p-6">
        <ApplicationForm
          key={selectedApplication?.id ?? "new"}
          application={selectedApplication}
          onClearSelection={onClearSelection}
        />
      </SidebarContent>
      <SidebarFooter className="flex flex-row justify-between items-center p-2 mb-1">
        <UserInfo />
      </SidebarFooter>
    </Sidebar>
  );
}
