export function ApplicationPipelineGraph({
  color,
  width,
}: {
  color: string;
  width: number;
}) {
  return <div className={color} style={{ width: `${width}%` }}></div>;
}
