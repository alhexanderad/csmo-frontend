export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CarImage {
  id: number;
  image: string;
  is_primary: boolean;
  order: number;
  upload_date: string;
}

export interface Make {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  name: string;
  make: Make;
}

export interface DriveType {
  id: number;
  name: string;
}

export interface Transmission {
  id: number;
  name: string;
}

export interface Car {
  id: number;
  vin: string;
  model: Model;
  color: string;
  year: number;
  price: number;
  images: CarImage[];
  primary_image?: CarImage;
}