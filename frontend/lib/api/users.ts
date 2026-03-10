import type { 
  User, 
  CreateUserDTO, 
  UpdateUserDTO, 
  ApiResponse, 
  PaginatedResponse,
  UserFilters,
  SortOptions 
} from '@/types/user'
import { mockUsers } from '@/lib/data/users'

// Simulated delay for API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage (replace with actual API calls in production)
let users: User[] = [...mockUsers]

/**
 * User API Service
 * 
 * This service provides CRUD operations for users.
 * Currently uses mock data, but is designed to be easily replaced
 * with actual API calls to a backend.
 * 
 * To connect to a real API, replace the implementation of each method
 * with fetch/axios calls to your backend endpoints.
 */
export const userApi = {
  /**
   * Get all users with optional filtering, sorting, and pagination
   */
  async getAll(
    filters?: UserFilters,
    sort?: SortOptions,
    page = 1,
    pageSize = 10
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    await delay(300) // Simulate network delay
    
    try {
      let filteredUsers = [...users]
      
      // Apply filters
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase()
        filteredUsers = filteredUsers.filter(user =>
          user.nombre.toLowerCase().includes(searchLower) ||
          user.direccion.toLowerCase().includes(searchLower) ||
          user.telefono.includes(filters.search!)
        )
      }
      
      if (filters?.pais) {
        filteredUsers = filteredUsers.filter(user => user.pais === filters.pais)
      }
      
      if (filters?.estadoCivil && filters.estadoCivil !== 'todos') {
        filteredUsers = filteredUsers.filter(user => user.estadoCivil === filters.estadoCivil)
      }
      
      // Apply sorting
      if (sort) {
        filteredUsers.sort((a, b) => {
          const aVal = a[sort.field]
          const bVal = b[sort.field]
          
          if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1
          if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1
          return 0
        })
      }
      
      // Apply pagination
      const total = filteredUsers.length
      const totalPages = Math.ceil(total / pageSize)
      const startIndex = (page - 1) * pageSize
      const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize)
      
      return {
        data: {
          data: paginatedUsers,
          total,
          page,
          pageSize,
          totalPages,
        },
        error: null,
        success: true,
      }
    } catch {
      return {
        data: null,
        error: 'Error fetching users',
        success: false,
      }
    }
  },
  
  /**
   * Get a single user by ID
   */
  async getById(id: string): Promise<ApiResponse<User>> {
    await delay(200)
    
    try {
      const user = users.find(u => u.id === id)
      
      if (!user) {
        return {
          data: null,
          error: 'User not found',
          success: false,
        }
      }
      
      return {
        data: user,
        error: null,
        success: true,
      }
    } catch {
      return {
        data: null,
        error: 'Error fetching user',
        success: false,
      }
    }
  },
  
  /**
   * Create a new user
   */
  async create(userData: CreateUserDTO): Promise<ApiResponse<User>> {
    await delay(400)
    
    try {
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      users = [newUser, ...users]
      
      return {
        data: newUser,
        error: null,
        success: true,
      }
    } catch {
      return {
        data: null,
        error: 'Error creating user',
        success: false,
      }
    }
  },
  
  /**
   * Update an existing user
   */
  async update(userData: UpdateUserDTO): Promise<ApiResponse<User>> {
    await delay(400)
    
    try {
      const index = users.findIndex(u => u.id === userData.id)
      
      if (index === -1) {
        return {
          data: null,
          error: 'User not found',
          success: false,
        }
      }
      
      const updatedUser: User = {
        ...users[index],
        ...userData,
        updatedAt: new Date(),
      }
      
      users[index] = updatedUser
      
      return {
        data: updatedUser,
        error: null,
        success: true,
      }
    } catch {
      return {
        data: null,
        error: 'Error updating user',
        success: false,
      }
    }
  },
  
  /**
   * Delete a user
   */
  async delete(id: string): Promise<ApiResponse<boolean>> {
    await delay(300)
    
    try {
      const index = users.findIndex(u => u.id === id)
      
      if (index === -1) {
        return {
          data: null,
          error: 'User not found',
          success: false,
        }
      }
      
      users = users.filter(u => u.id !== id)
      
      return {
        data: true,
        error: null,
        success: true,
      }
    } catch {
      return {
        data: null,
        error: 'Error deleting user',
        success: false,
      }
    }
  },
  
  /**
   * Reset to initial mock data (useful for testing)
   */
  reset(): void {
    users = [...mockUsers]
  },
}
