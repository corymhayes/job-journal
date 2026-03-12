import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingTable({ loadingState }: { loadingState: string }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="h-14">
          <TableHead>Status</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Job</TableHead>
          <TableHead>Work Style</TableHead>
          <TableHead>Job Posting</TableHead>
          <TableHead>Date Applied</TableHead>
          <TableHead>Date Response</TableHead>
          <TableHead>Days Passed</TableHead>
        </TableRow>
      </TableHeader>
      {loadingState === "loading" ? (
        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow className="h-14" key={index}>
              <TableCell className="w-[8%]">
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="w-[21%]">
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="w-[16%]">
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="w-[11%]">
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="w-[11%]">
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="w-[11%]">
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="w-[11%]">
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="w-[11%]">
                <Skeleton className="h-4 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          <TableRow className="h-14 border-0">
            <TableCell colSpan={100} align="center">
              Unable to load applications
            </TableCell>
          </TableRow>
          <TableRow className="h-14">
            <TableCell className="w-[8%]"></TableCell>
            <TableCell className="w-[21%]"></TableCell>
            <TableCell className="w-[16%]"></TableCell>
            <TableCell className="w-[11%]"></TableCell>
            <TableCell className="w-[11%]"></TableCell>
            <TableCell className="w-[11%]"></TableCell>
            <TableCell className="w-[11%]"></TableCell>
            <TableCell className="w-[11%]"></TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}
