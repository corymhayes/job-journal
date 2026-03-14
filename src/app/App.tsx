import { CSSProperties, useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TablePage } from "@/components/table/table-page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLayout } from "@/components/sidebar/layout";
import { LoadingTable } from "@/components/table/loading";
import type { Application } from "@/types/Application";
import { ThemeProvider } from "@/components/theme-provider";
import { StatBoxes } from "@/components/stat-boxes";
import {
  SpinnerBallIcon,
  FileTextIcon,
  CalendarDotsIcon,
  EnvelopeSimpleOpenIcon,
} from "@phosphor-icons/react";
import { ApplicationPipeline } from "@/components/application-pipeline";

function App() {
  const { data, status } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await fetch("/api");
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

  const findApplicationsInMonth = () => {
    const foundDates = [];
    const date = new Date();
    const month = date.getMonth();

    for (const d in data) {
      const dateSnapshot = new Date(data[d].date_applied);
      const monthSnapshot = dateSnapshot.getMonth();

      if (monthSnapshot === month) {
        foundDates.push(d);
      }
    }

    return foundDates.length;
  };

  const findInProgress = () => {
    const inProgress = [];
    for (const d in data) {
      if (
        data[d].status === "Recruiter Screen" ||
        data[d].status === "Initial Interview" ||
        data[d].status === "Technical Interview" ||
        data[d].status === "Final Interview"
      ) {
        inProgress.push(d);
      }
    }

    return inProgress.length;
  };

  const findResponseRate = () => {
    let totalDays = 0;
    let daysPassed = 0;
    const oneDay = 24 * 60 * 60 * 1000;

    for (const d in data) {
      const applied = new Date(data[d].date_applied);

      if (data[d].date_response) {
        const response = new Date(data[d].date_response);
        const milliPassed = Math.abs(response.getTime() - applied.getTime());
        totalDays += Math.round(milliPassed / oneDay);
        daysPassed += 1;
      }
    }

    return Math.floor((daysPassed / totalDays) * 100);
  };

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
        {status === "pending" ? (
          <LoadingTable loadingState="loading" />
        ) : status === "error" ? (
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
                stat={findApplicationsInMonth()}
                lastMonth={12}
              >
                <CalendarDotsIcon size={16} />
              </StatBoxes>
              <StatBoxes
                title="In progress"
                stat={findInProgress()}
                lastMonth={-10}
              >
                <SpinnerBallIcon size={16} />
              </StatBoxes>
              <StatBoxes
                title="Response rate"
                stat={findResponseRate()}
                lastMonth={42}
                percentage
              >
                <EnvelopeSimpleOpenIcon size={16} />
              </StatBoxes>
            </div>
            <ApplicationPipeline />
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
