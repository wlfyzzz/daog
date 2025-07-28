import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface LeaderboardEntry {
  name: string;
  wager: string;
  prize: string;
  avatar: string;
}

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  startFromRank?: number;
}

export const LeaderboardTable = ({ data, startFromRank = 4 }: LeaderboardTableProps) => {
  return (
    <div className="rounded-xl border border-[hsl(var(--gaming-yellow)/0.2)] overflow-hidden max-h-[60vh] overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow className="border-[hsl(var(--gaming-yellow)/0.2)] hover:bg-[hsl(var(--gaming-yellow)/0.05)]">
            <TableHead className="text-[hsl(var(--gaming-yellow))] font-bold text-sm sm:text-base py-3">PLACE</TableHead>
            <TableHead className="text-[hsl(var(--gaming-yellow))] font-bold text-sm sm:text-base py-3">USER</TableHead>
            <TableHead className="text-[hsl(var(--gaming-yellow))] font-bold text-sm sm:text-base py-3">PRIZE</TableHead>
            <TableHead className="text-[hsl(var(--gaming-yellow))] font-bold text-sm sm:text-base text-right py-3">WAGERED</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry, index) => {
            const rank = startFromRank + index;
            return (
              <TableRow 
                key={`${entry.name}-${rank}`} 
                className="border-[hsl(var(--gaming-yellow)/0.1)] hover:bg-[hsl(var(--gaming-yellow)/0.05)] transition-all duration-300 hover:scale-[1.01] group"
              >
                <TableCell className="font-black text-[hsl(var(--gaming-yellow))] text-sm sm:text-base py-3">
                  #{rank}
                </TableCell>
                <TableCell className="font-medium py-3">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="relative group/avatar">
                      <img 
                        src={entry.avatar} 
                        alt={`${entry.name}'s avatar`}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[hsl(var(--gaming-yellow)/0.4)] object-cover transition-transform duration-300 group-hover/avatar:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[hsl(var(--gaming-yellow)/0.2)] flex items-center justify-center text-[hsl(var(--gaming-yellow))] font-black text-xs hidden border-2 border-[hsl(var(--gaming-yellow)/0.4)] transition-transform duration-300 group-hover/avatar:scale-110">
                        {entry.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <span className="truncate max-w-[100px] sm:max-w-[150px] text-white font-medium text-xs sm:text-sm group-hover:text-[hsl(var(--gaming-yellow))] transition-colors">{entry.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <Badge 
                    variant="secondary" 
                    className="bg-[hsl(var(--gaming-yellow))] text-[hsl(var(--gaming-dark))] border-2 border-[hsl(var(--gaming-yellow)/0.5)] font-bold text-xs px-2 py-1 hover:scale-105 transition-transform duration-300"
                  >
                    <img src="https://toastyy.gg/assets/rain.svg" alt="Rain" className="w-3 h-3 mr-1" />
                    {entry.prize}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono font-semibold text-white text-xs sm:text-sm py-3">
                  {parseFloat(entry.wager).toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};