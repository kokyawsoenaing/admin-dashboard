import api from "./api";
import { type Project } from "../types/project";
import { type User } from "../types/user";
// Generic function for fetching data
async function fetchData<T>(endpoint: string, key: string): Promise<T[]> {
    const response = await api.get(`${endpoint}?limit=0`);
    return response.data[key];
}

// Specific functions for projects and users
export const getProjects = () => fetchData<Project>("/products", "products");
export const getUsers = () => fetchData<User>("/users", "users");
