import { PodiumCard } from "@/components/PodiumCard";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { PodiumCardSkeleton, LeaderboardRowSkeleton } from "@/components/EnhancedSkeleton";
import { NetworkErrorDisplay, ErrorBoundary } from "@/components/ErrorBoundary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { RefreshCw, TrendingUp } from "lucide-react";

const Index = () => {
  const { data, isLoading, error, refetch, isRefetching } = useLeaderboard();

  const noLB = data && data.length === 0;

  const handleRetry = () => {
    refetch();
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-3 mb-6">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-bounce-in">
                  Code syskeys
                </h1>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Track the top performers in our rain competition
              </p>

              <div className="mb-4 p-4 bg-card border border-border rounded-lg hover-lift">
                <p className="text-center text-foreground responsive-text">
                  Use code{" "}
                  <a
                    href="https://rain.gg/r/syskeys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[hsl(var(--gaming-yellow))] bg-[hsl(var(--gaming-yellow)/0.1)] px-3 py-2 rounded border-2 border-[hsl(var(--gaming-yellow)/0.3)] hover:bg-[hsl(var(--gaming-yellow))] hover:text-[hsl(var(--gaming-dark))] transition-all duration-300 underline decoration-2 underline-offset-2 hover-lift"
                  >
                    syskeys
                  </a>{" "}
                  to participate
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              {/* Optional UI controls (refresh, badge, etc) */}
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-8">
              <NetworkErrorDisplay
                onRetry={handleRetry}
                message={error.message || "Failed to load leaderboard data. Please try again."}
              />
            </div>
          )}

          {/* No Leaderboard */}
          {noLB && !isLoading && (
            <div className="text-center text-muted-foreground text-lg mb-12">
              No leaderboard data available yet.
            </div>
          )}

          {/* Top 3 Podium */}
          {!noLB && (
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 mr-2 text-[hsl(var(--gaming-yellow))]" />
                <h2 className="text-2xl font-bold">Top Performers</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 responsive-grid max-w-4xl mx-auto">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <PodiumCardSkeleton key={index} />
                  ))
                ) : (
                  <>
                    {data?.[1] && (
                      <div className="md:order-1">
                        <PodiumCard {...data[1]} rank={2} />
                      </div>
                    )}
                    {data?.[0] && (
                      <div className="md:order-2">
                        <PodiumCard {...data[0]} rank={1} isWinner />
                      </div>
                    )}
                    {data?.[2] && (
                      <div className="md:order-3">
                        <PodiumCard {...data[2]} rank={3} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Remaining Leaderboard */}
          {!noLB && (isLoading || data.length > 3) && (
            <div className="bg-gradient-card rounded-lg p-6 animate-slide-up hover-lift max-w-6xl mx-auto">
              {isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <LeaderboardRowSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <LeaderboardTable data={data.slice(3)} startFromRank={4} />
              )}
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-12 text-muted-foreground">
            <a
              href="https://wlfyzz.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
            >
              made with ♥ by wlfyzz.net
            </a>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
