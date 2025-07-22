import { cn } from "@/lib/utils";

interface EnhancedSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "badge";
  animate?: boolean;
}

export const EnhancedSkeleton = ({ 
  className, 
  variant = "text", 
  animate = true 
}: EnhancedSkeletonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "card":
        return "h-32 w-full rounded-lg";
      case "text":
        return "h-4 w-full rounded";
      case "circle":
        return "h-16 w-16 rounded-full";
      case "badge":
        return "h-8 w-20 rounded-full";
      default:
        return "h-4 w-full rounded";
    }
  };

  return (
    <div
      className={cn(
        "bg-muted",
        animate && "skeleton",
        getVariantStyles(),
        className
      )}
    />
  );
};

export const PodiumCardSkeleton = () => (
  <div className="relative p-6 border-2 border-gaming-border/20 bg-gradient-card rounded-lg animate-fade-in">
    <div className="text-center space-y-4">
      <EnhancedSkeleton variant="badge" className="mx-auto" />
      <EnhancedSkeleton variant="circle" className="mx-auto" />
      <div className="space-y-2">
        <EnhancedSkeleton className="h-6 w-3/4 mx-auto" />
        <EnhancedSkeleton className="h-4 w-1/2 mx-auto" />
        <EnhancedSkeleton className="h-6 w-2/3 mx-auto" />
      </div>
      <EnhancedSkeleton variant="badge" className="mx-auto" />
    </div>
  </div>
);

export const LeaderboardRowSkeleton = () => (
  <div className="flex items-center space-x-4 p-4 animate-fade-in">
    <EnhancedSkeleton className="h-6 w-8" />
    <EnhancedSkeleton variant="circle" className="h-10 w-10" />
    <div className="flex-1 space-y-2">
      <EnhancedSkeleton className="h-4 w-3/4" />
    </div>
    <div className="text-right space-y-2">
      <EnhancedSkeleton className="h-4 w-20" />
      <EnhancedSkeleton className="h-4 w-16" />
    </div>
  </div>
);