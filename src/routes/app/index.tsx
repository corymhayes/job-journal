import type { Application } from "../../applicationSchema";
import { SidebarLayout } from "@/components/sidebar/layout";
import { ApplicationPipeline } from "@/components/stats/application-pipeline";
import { ApplicationPipelineLoading } from "@/components/stats/application-pipeline-loading";
import { LoadingStats } from "@/components/stats/loading";
import { StatBoxes } from "@/components/stats/stat-boxes";
import { LoadingTable } from "@/components/table/loading";
import { TablePage } from "@/components/table/table-page";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { api } from "@/lib/api";
import { authClient } from "@/worker/auth";
import { SignedIn } from "@neondatabase/neon-js/auth/react";
import {
  CalendarDotsIcon,
  EnvelopeSimpleOpenIcon,
  FileTextIcon,
  SpinnerBallIcon,
} from "@phosphor-icons/react";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { type CSSProperties, useCallback, useEffect, useState } from "react";
import type { User } from "@/types/User";
import { DashboardErrorBoundary } from "@/components/dashboard-error-boundary";
import { ErrorBoundary } from "@/components/error-boundary";

export const Route = createFileRoute("/app/")({
  component: App,
  beforeLoad: async () => {
    const { data } = await authClient.getSession();

    if (!data?.session) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function AppContent() {
  const [userData, setUserData] = useState<User>();

  const { data, status } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data } = await api.request("/api");
      return data;
    },
  });

  const { data: stats, status: statsStatus } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { stats } = await api.request("/api/stats");
      return stats;
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

  useEffect(() => {
    const getUser = async () => {
      const { data } = await authClient.getSession();
      setUserData(data?.user);
    };

    getUser();
  }, []);

  return (
    <DashboardErrorBoundary>
      <SignedIn>
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
              <div className="flex flex-col w-full gap-5 mt-5">
                <div className="flex justify-evenly gap-5">
                  <LoadingStats title="Total this month">
                    <CalendarDotsIcon size={16} />
                  </LoadingStats>
                  <LoadingStats title="In progress">
                    <SpinnerBallIcon size={16} />
                  </LoadingStats>
                  <LoadingStats title="Response rate">
                    <EnvelopeSimpleOpenIcon size={16} />
                  </LoadingStats>
                  <LoadingStats title="Total applications">
                    <FileTextIcon size={16} />
                  </LoadingStats>
                </div>
                <ApplicationPipelineLoading />
                <LoadingTable loadingState="loading" />
              </div>
            ) : status === "error" || statsStatus === "error" ? (
              <LoadingTable loadingState="error" />
            ) : (
              <div className="flex flex-col w-full gap-5 mt-5">
                <div className="flex justify-evenly gap-5">
                  <StatBoxes
                    title="Total this month"
                    stat={stats.applications_in_month.numberOfApps}
                    lastMonth={stats.applications_in_month.percentageChange}
                    showChange
                  >
                    <CalendarDotsIcon size={16} weight="fill" />
                  </StatBoxes>
                  <StatBoxes
                    title="In progress"
                    stat={stats.in_progress.inProgress}
                    lastMonth={stats.in_progress.percentageChange}
                    showChange
                  >
                    <SpinnerBallIcon size={16} weight="fill" />
                  </StatBoxes>
                  <StatBoxes
                    title="Response rate"
                    stat={Math.floor(stats.response_rate.currentResponses)}
                    lastMonth={stats.response_rate.percentageChange}
                    percentage
                    showChange
                  >
                    <EnvelopeSimpleOpenIcon size={16} weight="fill" />
                  </StatBoxes>
                  <StatBoxes title="Total applications" stat={data.length}>
                    <FileTextIcon size={16} weight="fill" />
                  </StatBoxes>
                </div>
                <ApplicationPipeline status={stats.pipeline} />
                <TablePage applications={data} onEdit={handleEdit} />
              </div>
            )}
            <SidebarLayout
              selectedApplication={selectedApplication}
              onClearSelection={handleClearSelection}
              userData={userData}
            />
          </SidebarProvider>
        </ThemeProvider>
      </SignedIn>
    </DashboardErrorBoundary>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryErrorResetBoundary>
        {({ reset }) => <AppContent />}
      </QueryErrorResetBoundary>
    </ErrorBoundary>
  );
}

export default App;
