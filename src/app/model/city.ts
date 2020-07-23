export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: coordinate;
}

export interface coordinate {
  lon: number;
  lat: number;
}
