import { Rocket, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  type: 'no-results' | 'no-favorites' | 'error';
  onReset?: () => void;
}

export const EmptyState = ({ type, onReset }: EmptyStateProps) => {
  const configs = {
    'no-results': {
      icon: Search,
      title: 'No missions found',
      description: 'Try adjusting your search criteria or filters to find SpaceX missions.',
      actionText: 'Clear filters',
    },
    'no-favorites': {
      icon: Heart,
      title: 'No favorite missions yet',
      description: 'Start exploring SpaceX missions and mark your favorites by clicking the heart icon.',
      actionText: 'Browse missions',
    },
    'error': {
      icon: Rocket,
      title: 'Houston, we have a problem',
      description: 'Unable to load SpaceX mission data. Please check your connection and try again.',
      actionText: 'Retry',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-cosmic flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {config.title}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        {config.description}
      </p>
      
      {onReset && (
        <Button onClick={onReset} variant="outline">
          {config.actionText}
        </Button>
      )}
    </div>
  );
};