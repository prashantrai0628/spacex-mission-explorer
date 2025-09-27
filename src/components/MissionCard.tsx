import * as React from 'react';
import { Heart, Calendar, Rocket, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SpaceXLaunch } from '@/types/spacex';
import { useFavorites } from '@/hooks/useFavorites';

interface MissionCardProps {
  launch: SpaceXLaunch;
  rocketName?: string;
  onViewDetails: (launch: SpaceXLaunch) => void;
}

const MissionCardComponent = ({ launch, rocketName, onViewDetails }: MissionCardProps) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(launch.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = () => {
    if (launch.upcoming) {
      return <Badge variant="warning">Upcoming</Badge>;
    }
    if (launch.success === true) {
      return <Badge variant="success">Success</Badge>;
    }
    if (launch.success === false) {
      return <Badge variant="destructive">Failed</Badge>;
    }
    return <Badge variant="outline">Unknown</Badge>;
  };

  return (
    <Card className="p-6 bg-card border border-border card-glow hover:border-primary/50 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-12 h-12 rounded-full bg-gradient-cosmic flex items-center justify-center">
            {launch.links.patch.small ? (
              <img 
                src={launch.links.patch.small} 
                alt={`${launch.name} mission patch`}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <Rocket className="w-6 h-6 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">{launch.name}</h3>
            <p className="text-sm text-muted-foreground">Flight #{launch.flight_number}</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleFavorite(launch.id)}
          className={`${isFav ? 'text-destructive' : 'text-muted-foreground'} hover:scale-110 transition-bounce`}
        >
          <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(launch.date_utc)}</span>
        </div>

        {rocketName && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Rocket className="w-4 h-4" />
            <span>{rocketName}</span>
          </div>
        )}

        {launch.details && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {launch.details}
          </p>
        )}

        <div className="flex items-center justify-between pt-4">
          {getStatusBadge()}
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(launch)}
            className="group"
          >
            View Details
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const MissionCard = React.memo(MissionCardComponent);