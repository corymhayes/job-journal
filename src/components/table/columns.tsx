import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/table/status-badge";
import { ActionsCell } from "./actions-cell";
import { SortableHeader } from "./sortable-header";
import type { Application } from "@/applicationSchema";

export const createColumns = (
  onEdit: (application: Application) => void,
): ColumnDef<Application>[] => [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} label="Status" />,
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "company",
    header: ({ column }) => <SortableHeader column={column} label="Company" />,
  },
  {
    accessorKey: "job",
    header: ({ column }) => <SortableHeader column={column} label="Job" />,
  },
  {
    accessorKey: "work_style",
    header: ({ column }) => (
      <SortableHeader column={column} label="Work Style" />
    ),
  },
  {
    accessorKey: "application_url",
    header: "Job Posting",
    cell: ({ row }) => {
      const url = row.getValue("application_url") as string | null;
      if (!url) return <span className="text-muted-foreground">-</span>;
      return (
        <a
          href={`${row.getValue("application_url")}`}
          className="hover:underline underline-offset-6"
          target="_blank"
        >
          Link
        </a>
      );
    },
  },
  {
    accessorKey: "date_applied",
    header: ({ column }) => (
      <SortableHeader column={column} label="Date Applied" />
    ),
    cell: ({ row }) => {
      const applied = new Date(row.getValue("date_applied"));
      return applied.toISOString().split("T")[0];
    },
  },
  {
    accessorKey: "date_response",
    header: "Date Response",
    cell: ({ row }) => {
      return row.getValue("date_response")
        ? new Date(row.getValue("date_response")).toISOString().split("T")[0]
        : "";
    },
  },
  {
    accessorKey: "days_passed",
    header: ({ column }) => (
      <SortableHeader column={column} label="Days Passed" />
    ),
    cell: ({ row }) => {
      let daysPassed = 0;
      const oneDay = 24 * 60 * 60 * 1000;
      const applied = new Date(row.getValue("date_applied") as string);

      if (row.getValue("date_response")) {
        const response = new Date(row.getValue("date_response") as string);
        const milliPassed = Math.abs(response.getTime() - applied.getTime());
        daysPassed = Math.round(milliPassed / oneDay);
      } else {
        const today = new Date();
        const milliPassed = Math.abs(today.getTime() - applied.getTime());
        daysPassed = Math.round(milliPassed / oneDay);
      }

      return daysPassed;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} onEdit={onEdit} />,
  },
];
