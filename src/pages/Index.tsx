import { useState, useMemo } from 'react';
import { Rocket, Loader2 } from 'lucide-react';
import { useSpaceXLaunches, useSpaceXRockets } from '@/hooks/useSpaceX';
import { useFavorites } from '@/hooks/useFavorites';
import { MissionCard } from '@/components/MissionCard';
import { ThemeToggle } from '@/components/theme-toggle';
import { MissionFilters } from '@/components/MissionFilters';
import { MissionModal } from '@/components/MissionModal';
import { EmptyState } from '@/components/EmptyState';
import { LaunchCardSkeleton } from '@/components/ui/loading-skeleton';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis 
} from '@/components/ui/pagination';
import { SpaceXLaunch, LaunchFilters } from '@/types/spacex';

const Index = () => {
  const [filters, setFilters] = useState<LaunchFilters>({
    search: '',
    year: null,
    successOnly: false,
    favoritesOnly: false,
  });
  const [selectedLaunch, setSelectedLaunch] = useState<SpaceXLaunch | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: launches, isLoading, error, refetch } = useSpaceXLaunches();
  const { data: rockets } = useSpaceXRockets();
  const { favorites } = useFavorites();

  // Create rocket lookup map
  const rocketMap = useMemo(() => {
    if (!rockets) return {};
    return rockets.reduce((acc, rocket) => {
      acc[rocket.id] = rocket.name;
      return acc;
    }, {} as Record<string, string>);
  }, [rockets]);

  // Filter launches
  const filteredLaunches = useMemo(() => {
    if (!launches) return [];

    return launches.filter(launch => {
      // Search filter
      if (filters.search && !launch.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Year filter
      if (filters.year) {
        const launchYear = new Date(launch.date_utc).getFullYear().toString();
        if (launchYear !== filters.year) {
          return false;
        }
      }

      // Success filter
      if (filters.successOnly && launch.success !== true) {
        return false;
      }

      // Favorites filter
      if (filters.favoritesOnly && favorites && !favorites.includes(launch.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime());
  }, [launches, filters, favorites]);

  // Get available years
  const availableYears = useMemo(() => {
    if (!launches) return [];
    const years = launches.map(launch => new Date(launch.date_utc).getFullYear().toString());
    return Array.from(new Set(years)).sort((a, b) => b.localeCompare(a));
  }, [launches]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredLaunches.length / itemsPerPage);
  const paginatedLaunches = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLaunches.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLaunches, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  const handleViewDetails = (launch: SpaceXLaunch) => {
    setSelectedLaunch(launch);
  };

  const handleCloseModal = () => {
    setSelectedLaunch(null);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      year: null,
      successOnly: false,
      favoritesOnly: false,
    });
    resetToFirstPage();
  };

  const handleFiltersChange = (newFilters: LaunchFilters) => {
    setFilters(newFilters);
    resetToFirstPage();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <EmptyState type="error" onReset={() => refetch()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center cosmic-glow">
                <Rocket className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  SpaceX Mission Explorer
                </h1>
                <p className="text-sm text-muted-foreground">
                  Explore SpaceX launches, filter by criteria, and favorite your missions
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {launches && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {filteredLaunches.length} of {launches.length} missions
                  </p>
                </div>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <MissionFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            availableYears={availableYears}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <LaunchCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Results */}
        {!isLoading && (
          <>
            {filteredLaunches.length === 0 ? (
              <EmptyState 
                type={filters.favoritesOnly ? 'no-favorites' : 'no-results'} 
                onReset={handleResetFilters}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedLaunches.map(launch => (
                    <MissionCard
                      key={launch.id}
                      launch={launch}
                      rocketName={rocketMap[launch.rocket]}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1) setCurrentPage(currentPage - 1);
                            }}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>
                        
                        {/* Page numbers */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(pageNum);
                                }}
                                isActive={currentPage === pageNum}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}

                        <PaginationItem>
                          <PaginationNext 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                            }}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Mission Modal */}
      {selectedLaunch && (
        <MissionModal
          launch={selectedLaunch}
          rocketName={rocketMap[selectedLaunch.rocket]}
          isOpen={!!selectedLaunch}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Index;