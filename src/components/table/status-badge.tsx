import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: string }) {
  const badgeColors = () => {
    switch (status) {
      case "Applied":
        return (
          <Badge className="bg-yellow-950 text-yellow-300">{status}</Badge>
        );
      case "Recruiter Screen":
        return (
          <Badge className="bg-purple-950 text-purple-300">{status}</Badge>
        );
      case "Initial Interview":
        return <Badge className="bg-pink-950 text-pink-300">{status}</Badge>;
      case "Technical Interview":
        return <Badge className="bg-blue-950 text-blue-300">{status}</Badge>;
      case "Final Interview":
        return (
          <Badge className="bg-indigo-950 text-indigo-300">{status}</Badge>
        );
      case "Offer":
        return <Badge className="bg-green-950 text-green-300">{status}</Badge>;
      case "Rejected":
        return <Badge className="bg-red-950 text-red-300">{status}</Badge>;
      case "Withdrawn":
        return <Badge className="bg-zinc-300/25 text-zinc-300">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return <>{badgeColors()}</>;
}
