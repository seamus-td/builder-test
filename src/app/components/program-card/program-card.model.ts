export interface Program {
  id: string;
  title: string;
  image: string;
  locations: string[];
  season: string;
  description: string;
  featured?: boolean;
  country?: string;
  terms?: string[];
  programType?: string;
  region?: string;
}
