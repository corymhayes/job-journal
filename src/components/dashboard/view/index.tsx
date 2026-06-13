import { lazy, Suspense } from "react";
import type { Application } from "@/applicationSchema";
import { StatBoxes } from "../stats/stat-boxes";
import {
  CalendarDotsIcon,
  EnvelopeSimpleOpenIcon,
  FileTextIcon,
  SpinnerBallIcon,
} from "@phosphor-icons/react";
import type { Pipeline } from "@/types/Pipeline";

const ApplicationPipeline = lazy(() =>
  import("@/components/dashboard/stats/application-pipeline").then((m) => ({
    default: m.ApplicationPipeline,
  }))
);
const TablePage = lazy(() =>
  import("@/components/dashboard/table/table-page").then((m) => ({
    default: m.TablePage,
  }))
);

interface DashboardViewProps {
  data: Application[];
  stats: {
    applications_in_month: {
      numberOfApps: number;
      percentageChange: number;
    };
    in_progress: {
      inProgress: number;
      percentageChange: number;
    };
    response_rate: {
      currentResponses: number;
      percentageChange: number;
    };
    pipeline: Pipeline[];
  };
  setSelectedApplication: (application: Application) => void;
}

export default function DashboardView({
  data,
  stats,
  setSelectedApplication,
}: DashboardViewProps) {
  const handleEdit = (application: Application) => {
    setSelectedApplication(application);
  };

  return (
    <div className="flex flex-col w-full gap-3 mt-4 px-3 self-start">
      <div className="sm:flex sm:justify-evenly grid grid-cols-2 gap-3">
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
      <Suspense>
        <ApplicationPipeline status={stats.pipeline} />
      </Suspense>
      <Suspense>
        <TablePage applications={data} onEdit={handleEdit} />
      </Suspense>
    </div>
  );
}
