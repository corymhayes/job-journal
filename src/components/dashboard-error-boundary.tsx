import React, { type ErrorInfo, type ReactNode } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { WarningIcon } from "@phosphor-icons/react";

interface DashboardErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface DashboardErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class DashboardErrorBoundary extends React.Component<
  DashboardErrorBoundaryProps,
  DashboardErrorBoundaryState
> {
  constructor(props: DashboardErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): DashboardErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Dashboard error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-96 w-full">
          <Card className="max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <WarningIcon
                  size={40}
                  className="text-yellow-600"
                  weight="fill"
                />
              </div>
              <CardTitle>Dashboard Error</CardTitle>
              <CardDescription>
                Unable to load the dashboard. Try refreshing or come back later.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button onClick={this.handleReset} className="flex-1">
                Try Again
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1"
              >
                Refresh
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
