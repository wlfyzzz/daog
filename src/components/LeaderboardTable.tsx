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
    <div className="rounded-lg border border-gaming-border/30 bg-gaming-card/50 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gaming-border/30 hover:bg-gaming-card/30">
            <TableHead className="text-gaming-orange font-bold">Place</TableHead>
            <TableHead className="text-gaming-orange font-bold">User</TableHead>
            <TableHead className="text-gaming-orange font-bold">Prize</TableHead>
            <TableHead className="text-gaming-orange font-bold text-right">Wagered</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry, index) => {
            const rank = startFromRank + index;
            return (
              <TableRow 
                key={`${entry.name}-${rank}`} 
                className="border-gaming-border/20 hover:bg-gaming-card/50 transition-colors"
              >
                <TableCell className="font-bold text-gaming-orange">
                  #{rank}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={entry.avatar} 
                      alt={`${entry.name}'s avatar`}
                      className="w-8 h-8 rounded-full border border-gaming-border object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="w-8 h-8 rounded-full bg-gaming-orange/20 flex items-center justify-center text-gaming-orange font-bold text-sm hidden">
                      {entry.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate max-w-[200px]">{entry.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className="bg-gaming-orange/20 text-gaming-orange border-gaming-orange/30"
                  >
                    <img src="https://toastyy.gg/assets/rain.svg" alt="Rain" className="w-4 h-4 mr-1" />
                    {entry.prize}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono font-semibold">
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