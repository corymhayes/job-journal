// import { CSSProperties, useCallback, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { TablePage } from "@/components/table/table-page";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { SidebarLayout } from "@/components/sidebar/layout";
// import { LoadingTable } from "@/components/table/loading";
// import type { Application } from "@/applicationSchema";
// import { ThemeProvider } from "@/components/theme-provider";
// import { StatBoxes } from "@/components/stats/stat-boxes";
// import { LoadingStats } from "@/components/stats/loading";
// import { ApplicationPipelineLoading } from "@/components/stats/application-pipeline-loading";
// import {
//   SpinnerBallIcon,
//   FileTextIcon,
//   CalendarDotsIcon,
//   EnvelopeSimpleOpenIcon,
// } from "@phosphor-icons/react";
// import { ApplicationPipeline } from "@/components/stats/application-pipeline";

// function App() {
//   const { data: data, status: status } = useQuery({
//     queryKey: ["applications"],
//     queryFn: async () => {
//       const res = await fetch("/api");
//       return await res.json();
//     },
//   });

//   const { data: stats, status: statsStatus } = useQuery({
//     queryKey: ["stats"],
//     queryFn: async () => {
//       const res = await fetch("/api/stats");
//       return await res.json();
//     },
//   });

//   const [selectedApplication, setSelectedApplication] = useState<
//     Application | undefined
//   >(undefined);

//   const handleEdit = useCallback((application: Application) => {
//     setSelectedApplication(application);
//   }, []);

//   const handleClearSelection = useCallback(() => {
//     setSelectedApplication(undefined);
//   }, []);

//   return (
//     <ThemeProvider>
//       <SidebarProvider
//         style={
//           {
//             "--sidebar-width": "20rem",
//             "--sidebar-width-mobile": "20rem",
//           } as CSSProperties
//         }
//         className="px-6"
//       >
//         {status === "pending" || statsStatus === "pending" ? (
//           <div className="flex flex-col w-full gap-5 mt-5">
//             <div className="flex justify-evenly gap-5">
//               <LoadingStats title="Total this month">
//                 <CalendarDotsIcon size={16} />
//               </LoadingStats>
//               <LoadingStats title="In progress">
//                 <SpinnerBallIcon size={16} />
//               </LoadingStats>
//               <LoadingStats title="Response rate">
//                 <EnvelopeSimpleOpenIcon size={16} />
//               </LoadingStats>
//               <LoadingStats title="Total applications">
//                 <FileTextIcon size={16} />
//               </LoadingStats>
//             </div>
//             <ApplicationPipelineLoading />
//             <LoadingTable loadingState="loading" />
//           </div>
//         ) : status === "error" || statsStatus === "error" ? (
//           <LoadingTable loadingState="error" />
//         ) : (
//           <div className="flex flex-col w-full gap-5 mt-5">
//             <div className="flex justify-evenly gap-5">
//               <StatBoxes
//                 title="Total this month"
//                 stat={stats.applications_in_month.numberOfApps}
//                 lastMonth={stats.applications_in_month.percentChange}
//                 showChange
//               >
//                 <CalendarDotsIcon size={16} weight="fill" />
//               </StatBoxes>
//               <StatBoxes
//                 title="In progress"
//                 stat={stats.in_progress.inProgress}
//                 lastMonth={stats.in_progress.percentChange}
//                 showChange
//               >
//                 <SpinnerBallIcon size={16} weight="fill" />
//               </StatBoxes>
//               <StatBoxes
//                 title="Response rate"
//                 stat={Math.floor(stats.response_rate.currentResponses)}
//                 lastMonth={stats.response_rate.percentChange}
//                 percentage
//                 showChange
//               >
//                 <EnvelopeSimpleOpenIcon size={16} weight="fill" />
//               </StatBoxes>
//               <StatBoxes title="Total applications" stat={data.length}>
//                 <FileTextIcon size={16} weight="fill" />
//               </StatBoxes>
//             </div>
//             <ApplicationPipeline status={stats.pipeline} />
//             <TablePage applications={data} onEdit={handleEdit} />
//           </div>
//         )}
//         <SidebarLayout
//           selectedApplication={selectedApplication}
//           onClearSelection={handleClearSelection}
//         />
//       </SidebarProvider>
//     </ThemeProvider>
//   );
// }

// export default App;

import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react/ui";
import { authClient } from "../worker/auth";
import Login from "@/components/auth/login";

function App() {
  return (
    <NeonAuthUIProvider authClient={authClient}>
      <div className="w-screen h-screen flex items-center justify-center">
        <Login />
      </div>
    </NeonAuthUIProvider>
  );
}

export default App;
