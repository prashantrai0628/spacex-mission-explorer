import { useState, useEffect } from 'react';
import { Search, Calendar, Filter, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { LaunchFilters } from '@/types/spacex';
import { useFavorites } from '@/hooks/useFavorites';

interface MissionFiltersProps {
  filters: LaunchFilters;
  onFiltersChange: (filters: LaunchFilters) => void;
  availableYears: string[];
}

export const MissionFilters = ({ 
  filters, 
  onFiltersChange, 
  availableYears 
}: MissionFiltersProps) => {
  const [searchInput, setSearchInput] = useState(filters.search);
  const { favoritesCount } = useFavorites();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchInput });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handleYearChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      year: value === 'all' ? null : value 
    });
  };

  const toggleSuccessFilter = () => {
    onFiltersChange({ ...filters, successOnly: !filters.successOnly });
  };

  const toggleFavoritesFilter = () => {
    onFiltersChange({ ...filters, favoritesOnly: !filters.favoritesOnly });
  };

  const clearFilters = () => {
    setSearchInput('');
    onFiltersChange({ 
      search: '', 
      year: null, 
      successOnly: false, 
      favoritesOnly: false 
    });
  };

  const hasActiveFilters = filters.search || filters.year || filters.successOnly || filters.favoritesOnly;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by mission name (e.g., Starlink, CRS, Demo...)"
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 bg-card border-border focus:border-primary transition-smooth"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Year Filter */}
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Select 
            value={filters.year || 'all'} 
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-32 bg-card border-border">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All years</SelectItem>
              {availableYears.map(year => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Success Only Filter */}
        <Button
          variant={filters.successOnly ? "default" : "outline"}
          size="sm"
          onClick={toggleSuccessFilter}
          className="flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Successful only</span>
        </Button>

        {/* Favorites Filter */}
        <Button
          variant={filters.favoritesOnly ? "default" : "outline"}
          size="sm"
          onClick={toggleFavoritesFilter}
          className="flex items-center space-x-2"
        >
          <Heart className={`w-4 h-4 ${filters.favoritesOnly ? 'fill-current' : ''}`} />
          <span>Show favorites</span>
          {favoritesCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {favoritesCount}
            </Badge>
          )}
        </Button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <Search className="w-3 h-3" />
              <span>"{filters.search}"</span>
            </Badge>
          )}
          {filters.year && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{filters.year}</span>
            </Badge>
          )}
          {filters.successOnly && (
            <Badge variant="success">Successful missions</Badge>
          )}
          {filters.favoritesOnly && (
            <Badge variant="destructive" className="flex items-center space-x-1">
              <Heart className="w-3 h-3 fill-current" />
              <span>Favorites</span>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};