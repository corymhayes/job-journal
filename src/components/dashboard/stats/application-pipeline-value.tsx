import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ApplicationPipelineValue({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-normal w-10">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-lg font-semibold">{value}</CardContent>
    </Card>
  );
}
