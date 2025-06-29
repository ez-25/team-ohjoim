export interface Album {
  id: string;
  name: string;
  artist?: string;
  releaseDate?: string;
  image: string;
  extraImages?: (string | null)[];
  cost?: number;
  review?: string;
  popularity?: number;
}