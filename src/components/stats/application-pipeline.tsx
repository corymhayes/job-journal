import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ApplicationPipelineValue } from "./application-pipeline-value";
import { ApplicationPipelineGraph } from "./application-pipeline-graph";
import type { Pipeline } from "@/types/Pipeline";

export function ApplicationPipeline({ status }: { status: Pipeline[] }) {
  console.log(status);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications pipeline</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="w-full h-6 flex mt-2 mb-8">
          <ApplicationPipelineGraph
            color="bg-yellow-400"
            width={status[0].percentage}
          />
          <ApplicationPipelineGraph
            color="bg-purple-400"
            width={status[1].percentage}
          />
          <ApplicationPipelineGraph
            color="bg-pink-400"
            width={status[2].percentage}
          />
          <ApplicationPipelineGraph
            color="bg-blue-400"
            width={status[3].percentage}
          />
          <ApplicationPipelineGraph
            color="bg-indigo-400"
            width={status[4].percentage}
          />
          <ApplicationPipelineGraph
            color="bg-green-400"
            width={status[5].percentage}
          />
          <ApplicationPipelineGraph
            color="bg-red-400"
            width={status[6].percentage}
          />
          <ApplicationPipelineGraph
            color="bg-zinc-400"
            width={status[7].percentage}
          />
        </div>
        <div className="flex gap-5 w-full">
          {status.map((stat, i) => (
            <ApplicationPipelineValue
              title={stat.name}
              value={stat.value}
              key={i}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
