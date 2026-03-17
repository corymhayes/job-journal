// import type { Application } from "@/types/Application";
import { useMemo } from "react";
import { createColumns } from "./columns";
import { DataTable } from "./data-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Application } from "@/applicationSchema";

interface TablePageProps {
  applications: Application[];
  onEdit: (application: Application) => void;
}

export function TablePage({ applications, onEdit }: TablePageProps) {
  const columns = useMemo(() => createColumns(onEdit), [onEdit]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications table</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={applications} />
      </CardContent>
    </Card>
  );
}
