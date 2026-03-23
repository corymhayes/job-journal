import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "@phosphor-icons/react";

export function StatBoxes({
  children,
  title,
  stat,
  lastMonth,
  percentage,
  showChange,
}: {
  children: React.ReactNode;
  title: string;
  stat: number;
  lastMonth?: number;
  percentage?: boolean;
  showChange?: boolean;
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

        {showChange ? (
          lastMonth! > 0 ? (
            <p className="flex items-center gap-0.5">
              <ArrowUpIcon className="text-green-400" />
              <span className="text-green-400">{lastMonth}%</span>
              vs last month
            </p>
          ) : lastMonth! < 0 ? (
            <p className="flex items-center gap-0.5">
              <ArrowDownIcon className="text-red-400" />
              <span className="text-red-400">{lastMonth}%</span>
              vs last month
            </p>
          ) : (
            <p className="flex items-center gap-0.5">
              <span className="text-foreground/25">{lastMonth}%</span> vs last
              month
            </p>
          )
        ) : (
          <div>{lastMonth}</div>
        )}
      </CardContent>
    </Card>
  );
}
