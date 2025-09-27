import { useQuery } from '@tanstack/react-query';
import { SpaceXLaunch, SpaceXRocket } from '@/types/spacex';

const SPACEX_API_BASE = 'https://api.spacexdata.com/v4';

export const useSpaceXLaunches = () => {
  return useQuery<SpaceXLaunch[]>({
    queryKey: ['spacex-launches'],
    queryFn: async () => {
      const response = await fetch(`${SPACEX_API_BASE}/launches`);
      if (!response.ok) {
        throw new Error('Failed to fetch SpaceX launches');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSpaceXRockets = () => {
  return useQuery<SpaceXRocket[]>({
    queryKey: ['spacex-rockets'],
    queryFn: async () => {
      const response = await fetch(`${SPACEX_API_BASE}/rockets`);
      if (!response.ok) {
        throw new Error('Failed to fetch SpaceX rockets');
      }
      return response.json();
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useSpaceXLaunch = (id: string) => {
  return useQuery<SpaceXLaunch>({
    queryKey: ['spacex-launch', id],
    queryFn: async () => {
      const response = await fetch(`${SPACEX_API_BASE}/launches/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch SpaceX launch');
      }
      return response.json();
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};