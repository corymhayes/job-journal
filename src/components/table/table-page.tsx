import type { Application } from "@/types/Application";
import { useMemo } from "react";
import { createColumns } from "./columns";
import { DataTable } from "./data-table";

interface TablePageProps {
  applications: Application[];
  onEdit: (application: Application) => void;
}

export function TablePage({ applications, onEdit }: TablePageProps) {
  const columns = useMemo(() => createColumns(onEdit), [onEdit]);
  return <DataTable columns={columns} data={applications} />;
}
