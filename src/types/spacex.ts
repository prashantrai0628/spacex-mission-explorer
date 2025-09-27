export interface SpaceXLaunch {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  rocket: string;
  success: boolean | null;
  details: string | null;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    reddit: {
      campaign: string | null;
      launch: string | null;
      media: string | null;
      recovery: string | null;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };
  failures: Array<{
    time: number;
    altitude: number | null;
    reason: string;
  }>;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  upcoming: boolean;
}

export interface SpaceXRocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  diameter: {
    meters: number;
    feet: number;
  };
  height: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
  flickr_images: string[];
}

export interface LaunchFilters {
  search: string;
  year: string | null;
  successOnly: boolean;
  favoritesOnly: boolean;
}