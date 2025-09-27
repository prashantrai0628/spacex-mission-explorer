import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
}

export const LoadingSkeleton = ({ className }: LoadingSkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/50",
        className
      )}
    />
  );
};

export const LaunchCardSkeleton = () => {
  return (
    <div className="p-6 bg-card rounded-lg border border-border card-glow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <LoadingSkeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <LoadingSkeleton className="h-5 w-32" />
            <LoadingSkeleton className="h-4 w-24" />
          </div>
        </div>
        <LoadingSkeleton className="w-6 h-6" />
      </div>
      
      <div className="space-y-3">
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-3/4" />
        
        <div className="flex items-center justify-between pt-4">
          <LoadingSkeleton className="h-6 w-20" />
          <LoadingSkeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
};