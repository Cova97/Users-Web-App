'use client'

import useSWR from 'swr'
import { userApi } from '@/lib/api/users'
import type { UserFilters, SortOptions, CreateUserDTO, UpdateUserDTO } from '@/types/user'

// SWR key generator
const getUsersKey = (
  filters?: UserFilters,
  sort?: SortOptions,
  page?: number,
  pageSize?: number
) => ['users', filters, sort, page, pageSize]

/**
 * Custom hook for managing users with SWR
 * Provides caching, revalidation, and optimistic updates
 */
export function useUsers(
  filters?: UserFilters,
  sort?: SortOptions,
  page = 1,
  pageSize = 10
) {
  const { data, error, isLoading, mutate } = useSWR(
    getUsersKey(filters, sort, page, pageSize),
    () => userApi.getAll(filters, sort, page, pageSize),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  )
  
  const createUser = async (userData: CreateUserDTO) => {
    const result = await userApi.create(userData)
    if (result.success) {
      mutate()
    }
    return result
  }
  
  const updateUser = async (userData: UpdateUserDTO) => {
    const result = await userApi.update(userData)
    if (result.success) {
      mutate()
    }
    return result
  }
  
  const deleteUser = async (id: string) => {
    const result = await userApi.delete(id)
    if (result.success) {
      mutate()
    }
    return result
  }
  
  return {
    users: data?.data?.data ?? [],
    pagination: data?.data ? {
      total: data.data.total,
      page: data.data.page,
      pageSize: data.data.pageSize,
      totalPages: data.data.totalPages,
    } : null,
    isLoading,
    isError: !!error || !data?.success,
    error: error?.message || data?.error,
    createUser,
    updateUser,
    deleteUser,
    refresh: mutate,
  }
}
