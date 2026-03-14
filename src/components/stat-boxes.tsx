import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "@phosphor-icons/react";

export function StatBoxes({
  title,
  stat,
  lastMonth,
  children,
  percentage,
}: {
  title: string;
  stat: number;
  lastMonth: number;
  children: React.ReactNode;
  percentage?: boolean;
}) {
  return (
    <Card className="h-32 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {children}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full">
        {percentage ? (
          <p className="text-xl font-semibold">{stat}%</p>
        ) : (
          <p className="text-xl font-semibold">{stat}</p>
        )}
        {lastMonth > 0 ? (
          <p className="flex items-center gap-0.5">
            <ArrowUpIcon className="text-green-400" />
            <span className="text-green-400">{lastMonth}%</span>
            vs last month
          </p>
        ) : (
          <p className="flex items-center gap-0.5">
            <ArrowDownIcon className="text-red-400" />
            <span className="text-red-400">{lastMonth}%</span>
            vs last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
