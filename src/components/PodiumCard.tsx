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
        return "bg-gradient-card border-gaming-border/50 scale-105 shadow-[0_0_40px_hsl(var(--gaming-orange)/0.4)] hover:shadow-[0_0_60px_hsl(var(--gaming-orange)/0.6)] animate-pulse-glow";
      case 2:
        return "bg-gradient-card border-gaming-border/40 shadow-[0_0_30px_hsl(var(--gaming-orange)/0.3)] hover:shadow-[0_0_45px_hsl(var(--gaming-orange)/0.5)]";
      case 3:
        return "bg-gradient-card border-gaming-border/30 shadow-[0_0_20px_hsl(var(--gaming-orange)/0.2)] hover:shadow-[0_0_35px_hsl(var(--gaming-orange)/0.4)]";
      default:
        return "bg-gradient-card border-gaming-border/20";
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
        "relative p-6 border-2 hover-lift animate-bounce-in",
        getRankStyle()
      )}
      style={{ animationDelay: `${rank * 0.1}s` }}
    >
      <div className="text-center space-y-4">
        <div className="text-3xl font-bold text-gaming-orange mb-2">
          {getRankBadge()}
        </div>
        
        <div className="flex justify-center mb-4">
          <img 
            src={avatar} 
            alt={`${name}'s avatar`}
            className="w-16 h-16 rounded-full border-2 border-gaming-border object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="w-16 h-16 rounded-full bg-gaming-orange/20 border-2 border-gaming-border flex items-center justify-center text-gaming-orange font-bold text-2xl hidden">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          <div className="text-sm text-muted-foreground">
            Wagered
          </div>
          <div className="text-xl font-bold text-foreground">
            {parseFloat(wager).toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </div>
        </div>

        <Badge 
          variant="secondary" 
          className="bg-gaming-orange text-gaming-dark font-bold text-lg px-4 py-2"
        >
          <img src="https://toastyy.gg/assets/rain.svg" alt="Rain" className="w-5 h-5 mr-2" />
          {prize}
        </Badge>
      </div>
    </Card>
  );
};