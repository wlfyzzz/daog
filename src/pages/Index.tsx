  import { PodiumCard } from "@/components/PodiumCard";
  import { LeaderboardTable } from "@/components/LeaderboardTable";
  import { PodiumCardSkeleton, LeaderboardRowSkeleton } from "@/components/EnhancedSkeleton";
  import { NetworkErrorDisplay, ErrorBoundary } from "@/components/ErrorBoundary";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { useLeaderboard } from "@/hooks/useLeaderboard";
  import { RefreshCw, TrendingUp, Trophy, Users, Zap } from "lucide-react";


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDiscord } from 'react-icons/fa'; // react-icons still works with Vite

const LeaderboardNotice = () => {
  return (
    <div className="text-center text-muted-foreground text-lg mb-12">
      <p className="mb-4">
        This leaderboard is currently inactive due to non-payment.
      </p>
      <div className="flex justify-center items-center gap-3">
        <img
          src="https://www.svgrepo.com/show/353655/discord-icon.svg"
          alt="Discord"
          className="w-6 h-6"
        />
        <a
          href="https://discord.com/users/1379948699127644160" // Replace with your actual Discord user ID
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Contact @wlfyzz.dev on Discord
        </a>
      </div>
    </div>
  );
};


const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) return;
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      if (!newTime) {
        clearInterval(timer);
        setTimeLeft(null);
      } else {
        setTimeLeft(newTime);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <div className="text-lg font-semibold text-red-500">Event ended</div>;
  }

  const timeDisplay = [
    { label: "D", value: timeLeft.days },
    { label: "H", value: timeLeft.hours },
    { label: "M", value: timeLeft.minutes },
    { label: "S", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-6 text-white font-bold text-xl sm:text-2xl mb-8">
      {timeDisplay.map(({ label, value }) => (
        <div key={label} className="text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-[hsl(var(--gaming-yellow))] text-3xl sm:text-4xl font-extrabold"
            >
              {value.toString().padStart(2, "0")}
            </motion.div>
          </AnimatePresence>
          <div className="text-sm text-muted-foreground tracking-wide">{label}</div>
        </div>
      ))}
    </div>
  );
};


  const Index = () => {
let { data, isLoading, error, refetch, isRefetching } = useLeaderboard();
      const isUnpaid = true; // 👈 Change this to false when paid

  // Show notice only
  if (isUnpaid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <LeaderboardNotice />
      </div>
    );
  }

if (isLoading || !data) {
  return <div className="text-center text-muted-foreground"></div>;
}

// Safe to use data here
const ends = data.ends_at;
data = data.participants || [];

    let inspect = false;
    let noLB = false;

    if (data == null) {
      inspect = false;
      noLB = true;
    }

    if (!inspect) {
      noLB = data && data.length === 0;
    }

    const handleRetry = () => {
      refetch();
    };

    const totalParticipants = data?.length || 0;
    const totalWagered = data?.reduce((sum, entry) => sum + parseFloat(entry.wager), 0) || 0;
    const totalPrizes = data?.reduce((sum, entry) => sum + parseFloat(entry.prize), 0) || 0;

    return (
      <ErrorBoundary>
        
        <div className="min-h-screen bg-background">
                  <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
            {/* Header Section */}
            <div className="text-center mb-16 space-y-10 animate-fade-in">
              <div className="space-y-8">
                  <div className="flex justify-center items-center gap-3 mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black bg-gradient-primary bg-clip-text text-transparent animate-bounce-in tracking-wider">
                      CODE SYSKEYS
                    </h1>
                  </div>

                <p className="text-lg sm:text-xl md:text-2xl text-[hsl(var(--gaming-yellow))] max-w-4xl mx-auto leading-relaxed font-semibold tracking-wide px-4">
                  TRACK THE TOP PERFORMERS IN OUR RAIN COMPETITION
                </p>

                {/* Stats Cards */}
                {!noLB && !inspect && data && data.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto px-4 sm:px-0">
                    <div className="bg-gradient-card border border-[hsl(var(--gaming-yellow)/0.3)] rounded-xl p-4 text-center hover-lift">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="w-5 h-5 text-[hsl(var(--gaming-yellow))] mr-2" />
                        <span className="text-white font-bold text-lg">{totalParticipants}</span>
                      </div>
                      <p className="text-[hsl(var(--gaming-yellow))] text-sm font-medium">PARTICIPANTS</p>
                    </div>
                    
                    <div className="bg-gradient-card border border-[hsl(var(--gaming-yellow)/0.3)] rounded-xl p-4 text-center hover-lift">
                      <div className="flex items-center justify-center mb-2">
                        <Zap className="w-5 h-5 text-[hsl(var(--gaming-yellow))] mr-2" />
                        <span className="text-white font-bold text-lg">
                          {totalWagered.toLocaleString(undefined, { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })}
                        </span>
                      </div>
                      <p className="text-[hsl(var(--gaming-yellow))] text-sm font-medium">TOTAL WAGERED</p>
                    </div>
                    
                    <div className="bg-gradient-card border border-[hsl(var(--gaming-yellow)/0.3)] rounded-xl p-4 text-center hover-lift">
                      <div className="flex items-center justify-center mb-2">
                        <Trophy className="w-5 h-5 text-[hsl(var(--gaming-yellow))] mr-2" />
                        <span className="text-white font-bold text-lg">
                          {totalPrizes.toLocaleString(undefined, { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })}
                        </span>
                      </div>
                      <p className="text-[hsl(var(--gaming-yellow))] text-sm font-medium">TOTAL PRIZES</p>
                    </div>
                  </div>
                )}

                <div className="mb-8 p-6 sm:p-8 bg-gradient-card border-2 border-[hsl(var(--gaming-yellow)/0.4)] rounded-xl hover-lift shadow-xl mx-4 sm:mx-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gaming-yellow)/0.05)] to-transparent"></div>
                  <div className="relative z-10">
                    <p className="text-center text-white font-semibold text-base sm:text-lg leading-relaxed">
                      USE CODE{" "}
                      <a
                        href="https://rain.gg/r/syskeys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-black text-[hsl(var(--gaming-dark))] bg-[hsl(var(--gaming-yellow))] px-4 sm:px-6 py-3 sm:py-3 rounded-xl border-2 border-[hsl(var(--gaming-yellow)/0.6)] hover:bg-[hsl(var(--gaming-yellow)/0.8)] transition-all duration-300 underline decoration-2 underline-offset-2 hover-lift shadow-lg"
                      >
                        SYSKEYS
                      </a>{" "}
                      TO PARTICIPATE
                    </p>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-12 px-4 sm:px-0">
                  <a
                    href="https://kick.com/syskeysss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 bg-[#53FC18] text-black font-black rounded-xl hover:bg-[#45D415] transition-all duration-300 hover-lift shadow-lg border-2 border-[#53FC18]/50 w-full sm:w-auto min-w-[140px] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <img src="https://kick.com/favicon.ico" alt="Kick" className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                    <span className="relative z-10">KICK</span>
                  </a>
                  <a
                    href="https://discord.gg/syskeys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 bg-[#5865F2] text-white font-black rounded-xl hover:bg-[#4752C4] transition-all duration-300 hover-lift shadow-lg border-2 border-[#5865F2]/50 w-full sm:w-auto min-w-[140px] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    <span className="relative z-10">DISCORD</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@syskeyss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 bg-[#f44336] text-black font-black rounded-xl hover:bg-[#f44336] transition-all duration-300 hover-lift shadow-lg border-2 border-[#53FC18]/50 w-full sm:w-auto min-w-[140px] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <img src="https://youtube.com/favicon.ico" alt="Kick" className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                    <span className="relative z-10">YOUTUBE</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4">
                {/* Optional UI controls (refresh, badge, etc) */}
              </div>
            </div>{ends && <CountdownTimer targetDate={ends} />}


            {/* No Leaderboard */}
            {noLB && !isLoading && !inspect && ( 
              <div className="text-center text-muted-foreground text-lg mb-12">
                Leaderboard ended.
              </div>
            )}
                      {inspect && ( 
              <div className="text-center text-muted-foreground text-lg mb-12">
                Please close inspect element to view the site. 
              </div>
            )}

            {/* Top 3 Podium */}
            {!noLB && !inspect && (
              <div className="mb-16">
                <div className="flex items-center justify-center mb-8 sm:mb-10">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[hsl(var(--gaming-yellow))]" />
                    <h2 className="text-2xl sm:text-3xl font-black text-[hsl(var(--gaming-yellow))] tracking-wide">TOP PERFORMERS</h2>
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[hsl(var(--gaming-yellow))]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 responsive-grid max-w-5xl mx-auto px-4 sm:px-0">
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
            {!noLB && (isLoading || data.length > 3) && !inspect && (
              <div className="rounded-xl p-6 sm:p-8 animate-slide-up max-w-7xl mx-auto px-4 sm:px-0">
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
            <div className="text-center mt-16">
              <div className="text-muted-foreground">
                <a
                  href="https://wlfyzz.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-foreground transition-colors group"
                >
                  <span className="group-hover:text-[hsl(var(--gaming-yellow))] transition-colors">made with ♥ by WLFYZZ.NET</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  };

  export default Index;
