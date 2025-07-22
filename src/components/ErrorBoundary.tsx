import { Component, ReactNode } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[200px] flex items-center justify-center p-6">
          <Alert className="max-w-md animate-fade-in">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="space-y-4">
              <div>
                <p className="font-semibold">Something went wrong</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {this.state.error?.message || "An unexpected error occurred"}
                </p>
              </div>
              <Button 
                onClick={this.handleRetry}
                size="sm"
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export const NetworkErrorDisplay = ({ 
  onRetry, 
  message = "Failed to load data. Please check your connection and try again." 
}: { 
  onRetry: () => void; 
  message?: string; 
}) => (
  <Alert className="animate-fade-in border-destructive/50 bg-destructive/10">
    <AlertTriangle className="h-4 w-4 text-destructive" />
    <AlertDescription className="space-y-3">
      <p>{message}</p>
      <Button 
        onClick={onRetry}
        size="sm"
        variant="outline"
        className="hover-lift"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Retry
      </Button>
    </AlertDescription>
  </Alert>
);