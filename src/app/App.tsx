import { CSSProperties, useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TablePage } from "@/components/table/table-page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLayout } from "@/components/sidebar/layout";
import { LoadingTable } from "@/components/table/loading";
import type { Application } from "@/types/Application";
import { ThemeProvider } from "@/components/theme-provider";

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
          <TablePage applications={data} onEdit={handleEdit} />
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
