import { X, ExternalLink, Calendar, Rocket, Heart, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SpaceXLaunch } from '@/types/spacex';
import { useFavorites } from '@/hooks/useFavorites';

interface MissionModalProps {
  launch: SpaceXLaunch;
  rocketName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MissionModal = ({ launch, rocketName, isOpen, onClose }: MissionModalProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(launch.id);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  };

  const getStatusBadge = () => {
    if (launch.upcoming) {
      return <Badge variant="warning" className="text-sm">Upcoming</Badge>;
    }
    if (launch.success === true) {
      return <Badge variant="success" className="text-sm">Mission Success</Badge>;
    }
    if (launch.success === false) {
      return <Badge variant="destructive" className="text-sm">Mission Failed</Badge>;
    }
    return <Badge variant="outline" className="text-sm">Status Unknown</Badge>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto card-glow">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-start justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-16 h-16 rounded-full bg-gradient-cosmic flex items-center justify-center">
              {launch.links.patch.large || launch.links.patch.small ? (
                <img 
                  src={launch.links.patch.large || launch.links.patch.small || ''} 
                  alt={`${launch.name} mission patch`}
                  className="w-14 h-14 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '';
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <Rocket className="w-8 h-8 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{launch.name}</h2>
              <p className="text-muted-foreground">Flight #{launch.flight_number}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(launch.id)}
              className={`${isFav ? 'text-destructive' : 'text-muted-foreground'} hover:scale-110 transition-bounce`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            {getStatusBadge()}
            <div className="text-sm text-muted-foreground">
              {launch.upcoming ? 'Scheduled for' : 'Launched on'}
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Launch Date</p>
                  <p className="text-sm text-muted-foreground">{formatDate(launch.date_utc)}</p>
                </div>
              </div>

              {rocketName && (
                <div className="flex items-center space-x-3">
                  <Rocket className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Rocket</p>
                    <p className="text-sm text-muted-foreground">{rocketName}</p>
                  </div>
                </div>
              )}

              {launch.crew && launch.crew.length > 0 && (
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Crew Members</p>
                    <p className="text-sm text-muted-foreground">{launch.crew.length} astronauts</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {launch.payloads && launch.payloads.length > 0 && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Payloads</p>
                    <p className="text-sm text-muted-foreground">{launch.payloads.length} payload(s)</p>
                  </div>
                </div>
              )}

              {launch.auto_update !== undefined && (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${launch.auto_update ? 'bg-success' : 'bg-muted'}`} />
                  </div>
                  <div>
                    <p className="font-medium">Auto Updates</p>
                    <p className="text-sm text-muted-foreground">
                      {launch.auto_update ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mission Details */}
          {launch.details && (
            <div>
              <h3 className="font-semibold mb-2">Mission Details</h3>
              <p className="text-muted-foreground leading-relaxed">{launch.details}</p>
            </div>
          )}

          {/* Failures */}
          {launch.failures && launch.failures.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-destructive">Mission Failures</h3>
              <div className="space-y-2">
                {launch.failures.map((failure, index) => (
                  <div key={index} className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                    <p className="text-sm text-destructive">{failure.reason}</p>
                    {failure.altitude && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Altitude: {failure.altitude.toLocaleString()} km
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Links */}
          <div>
            <h3 className="font-semibold mb-3">External Links</h3>
            <div className="grid grid-cols-2 gap-3">
              {launch.links.wikipedia && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Wikipedia
                  </a>
                </Button>
              )}
              
              {launch.links.webcast && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Webcast
                  </a>
                </Button>
              )}
              
              {launch.links.article && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={launch.links.article} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Article
                  </a>
                </Button>
              )}
              
              {launch.links.presskit && (
                <Button variant="outline" asChild className="justify-start">
                  <a href={launch.links.presskit} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Press Kit
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};