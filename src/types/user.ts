export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  age: number;
  gender: string;
  role: string;
}

export interface UserApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
