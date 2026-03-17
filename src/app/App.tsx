import { CSSProperties, useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TablePage } from "@/components/table/table-page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLayout } from "@/components/sidebar/layout";
import { LoadingTable } from "@/components/table/loading";
import type { Application } from "@/applicationSchema";
import { ThemeProvider } from "@/components/theme-provider";
import { StatBoxes } from "@/components/stats/stat-boxes";
import {
  SpinnerBallIcon,
  FileTextIcon,
  CalendarDotsIcon,
  EnvelopeSimpleOpenIcon,
} from "@phosphor-icons/react";
import { ApplicationPipeline } from "@/components/stats/application-pipeline";

function App() {
  const { data: data, status: status } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await fetch("/api");
      return await res.json();
    },
  });

  const { data: stats, status: statsStatus } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch("/api/stats");
      return await res.json();
    },
  });

  const [selectedApplication, setSelectedApplication] = useState<
    Application | undefined
  >(undefined);

  const handleEdit = useCallback((application: Application) => {
    setSelectedApplication(application);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedApplication(undefined);
  }, []);

  return (
    <ThemeProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "20rem",
            "--sidebar-width-mobile": "20rem",
          } as CSSProperties
        }
        className="px-6"
      >
        {status === "pending" || statsStatus === "pending" ? (
          <LoadingTable loadingState="loading" />
        ) : status === "error" || statsStatus === "error" ? (
          <LoadingTable loadingState="error" />
        ) : (
          <div className="flex flex-col w-full gap-5 mt-5">
            <div className="flex justify-evenly gap-5">
              <StatBoxes
                title="Total applications"
                stat={data.length}
                lastMonth={30}
              >
                <FileTextIcon size={16} />
              </StatBoxes>
              <StatBoxes
                title="Total this month"
                stat={stats.applications_in_month.numberOfApps}
                lastMonth={stats.applications_in_month.percentChange}
              >
                <CalendarDotsIcon size={16} />
              </StatBoxes>
              <StatBoxes
                title="In progress"
                stat={stats.in_progress.inProgress}
                lastMonth={stats.in_progress.percentChange}
              >
                <SpinnerBallIcon size={16} />
              </StatBoxes>
              <StatBoxes
                title="Response rate"
                stat={Math.floor(stats.response_rate.currentResponses)}
                lastMonth={stats.response_rate.percentChange}
                percentage
              >
                <EnvelopeSimpleOpenIcon size={16} />
              </StatBoxes>
            </div>
            <ApplicationPipeline status={stats.pipeline} />
            <TablePage applications={data} onEdit={handleEdit} />
          </div>
        )}
        <SidebarLayout
          selectedApplication={selectedApplication}
          onClearSelection={handleClearSelection}
        />
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
