export interface Project {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
}

export interface ApiResponse {
  products: Project[];
  total: number;
  skip: number;
  limit: number;
}
