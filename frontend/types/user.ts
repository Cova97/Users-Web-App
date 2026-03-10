// User entity type definition
export interface User {
  id: string
  nombre: string
  edad: number
  telefono: string
  direccion: string
  pais: string
  estadoCivil: 'casado' | 'soltero'
  createdAt: Date
  updatedAt: Date
}

// DTO for creating a new user
export interface CreateUserDTO {
  nombre: string
  edad: number
  telefono: string
  direccion: string
  pais: string
  estadoCivil: 'casado' | 'soltero'
}

// DTO for updating an existing user
export interface UpdateUserDTO extends Partial<CreateUserDTO> {
  id: string
}

// API Response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Filter and sort options
export interface UserFilters {
  search?: string
  pais?: string
  estadoCivil?: 'casado' | 'soltero' | 'todos'
}

export interface SortOptions {
  field: keyof User
  direction: 'asc' | 'desc'
}
