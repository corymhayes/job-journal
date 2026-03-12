import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

// Use TData to be able to work with any column data type
interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>;
  label: string;
}

export function SortableHeader<TData>({
  column,
  label,
}: SortableHeaderProps<TData>) {
  const sorted = column.getIsSorted();
  const icon =
    sorted === "asc" ? (
      <ArrowUp />
    ) : sorted === "desc" ? (
      <ArrowDown />
    ) : (
      <div></div>
    );

  return (
    <Button
      variant="link"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className="px-0! text-foreground"
    >
      {label} {icon}
    </Button>
  );
}
