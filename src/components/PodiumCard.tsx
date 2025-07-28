import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PodiumCardProps {
  rank: number;
  name: string;
  wager: string;
  prize: string;
  avatar: string;
  isWinner?: boolean;
}

export const PodiumCard = ({ rank, name, wager, prize, avatar, isWinner }: PodiumCardProps) => {
  const getRankStyle = () => {
    switch (rank) {
      case 1:
        return "bg-gradient-card border-[hsl(var(--gaming-yellow)/0.6)] scale-105 shadow-[0_0_50px_hsl(var(--gaming-yellow)/0.5)] hover:shadow-[0_0_70px_hsl(var(--gaming-yellow)/0.7)] animate-pulse-glow relative overflow-hidden";
      case 2:
        return "bg-gradient-card border-[hsl(var(--gaming-yellow)/0.4)] shadow-[0_0_35px_hsl(var(--gaming-yellow)/0.4)] hover:shadow-[0_0_50px_hsl(var(--gaming-yellow)/0.6)] relative overflow-hidden";
      case 3:
        return "bg-gradient-card border-[hsl(var(--gaming-yellow)/0.3)] shadow-[0_0_25px_hsl(var(--gaming-yellow)/0.3)] hover:shadow-[0_0_40px_hsl(var(--gaming-yellow)/0.5)] relative overflow-hidden";
      default:
        return "bg-gradient-card border-[hsl(var(--gaming-yellow)/0.2)] relative overflow-hidden";
    }
  };

  const getRankBadge = () => {
    switch (rank) {
      case 1:
        return "#1";
      case 2:
        return "#2";
      case 3:
        return "#3";
      default:
        return `#${rank}`;
    }
  };

  return (
    <Card
      className={cn(
        "relative p-6 sm:p-8 border-2 hover-lift animate-bounce-in rounded-xl group",
        getRankStyle()
      )}
      style={{ animationDelay: `${rank * 0.1}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gaming-yellow)/0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="text-center space-y-6 relative z-10">
        <div className="text-3xl sm:text-4xl font-black text-[hsl(var(--gaming-yellow))] mb-3 sm:mb-4">
          {getRankBadge()}
        </div>
        
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative group/avatar">
            <img 
              src={avatar} 
              alt={`${name}'s avatar`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-[hsl(var(--gaming-yellow)/0.5)] object-cover shadow-lg transition-transform duration-300 group-hover/avatar:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[hsl(var(--gaming-yellow)/0.2)] border-3 border-[hsl(var(--gaming-yellow)/0.5)] flex items-center justify-center text-[hsl(var(--gaming-yellow))] font-black text-2xl sm:text-3xl hidden shadow-lg transition-transform duration-300 group-hover/avatar:scale-110">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-[hsl(var(--gaming-yellow)/0.8)] opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-black text-lg sm:text-xl truncate text-white tracking-wide">{name}</h3>
          <div className="text-xs sm:text-sm text-[hsl(var(--gaming-yellow))] font-bold tracking-wider">
            WAGERED
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            {parseFloat(wager).toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </div>
        </div>

        <Badge 
          variant="secondary" 
          className="bg-[hsl(var(--gaming-yellow))] text-[hsl(var(--gaming-dark))] font-black text-base sm:text-lg px-5 sm:px-6 py-3 border-2 border-[hsl(var(--gaming-yellow)/0.6)] rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <img src="https://toastyy.gg/assets/rain.svg" alt="Rain" className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          {prize}
        </Badge>
      </div>
    </Card>
  );
};