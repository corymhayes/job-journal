import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ApplicationForm } from "./application-form";
import { UserInfo } from "./user-info";
import type { Application } from "@/applicationSchema";
import type { User } from "@/types/User";
import { SidebarSimpleIcon } from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/ui/kbd";

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
        <div className="w-full flex justify-evenly mt-5">
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
      <Tooltip>
        <TooltipTrigger
          className="ml-3 -mr-7 self-end my-5 z-50"
          onClick={toggleSidebar}
        >
          <SidebarSimpleIcon weight="fill" size={20} />
          <TooltipContent
            side="right"
            className="bg-black border-secondary text-secondary-foreground"
            id="tooltip-jj"
          >
            <p>Toggle sidebar</p>
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </>
  );
}

// <button
//   type="button"
//   className="ml-3 -mr-7 self-end my-5"
//   onClick={toggleSidebar}
// >
// </button>
