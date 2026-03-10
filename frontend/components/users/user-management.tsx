'use client'

import { useState, useCallback } from 'react'
import type { User, UserFilters as UserFiltersType, CreateUserDTO } from '@/types/user'
import { useUsers } from '@/hooks/use-users'
import { UserTable } from './user-table'
import { UserForm } from './user-form'
import { DeleteConfirmation } from './delete-confirmation'
import { UserFilters } from './user-filters'
import { Pagination } from './pagination'
import { StatsCards } from './stats-cards'
import { Button } from '@/components/ui/button'
import { Plus, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export function UserManagement() {
  const [filters, setFilters] = useState<UserFiltersType>({
    search: '',
    pais: undefined,
    estadoCivil: 'todos',
  })
  const [page, setPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { 
    users, 
    pagination, 
    isLoading, 
    createUser, 
    updateUser, 
    deleteUser,
    refresh 
  } = useUsers(filters, undefined, page, 5)

  const handleEdit = useCallback((user: User) => {
    setSelectedUser(user)
    setIsFormOpen(true)
  }, [])

  const handleDelete = useCallback((user: User) => {
    setSelectedUser(user)
    setIsDeleteOpen(true)
  }, [])

  const handleCreate = useCallback(() => {
    setSelectedUser(null)
    setIsFormOpen(true)
  }, [])

  const handleFormSubmit = useCallback(async (data: CreateUserDTO) => {
    setIsSubmitting(true)
    try {
      if (selectedUser) {
        const result = await updateUser({ id: selectedUser.id, ...data })
        if (result.success) {
          toast.success('Usuario actualizado correctamente')
        } else {
          toast.error(result.error || 'Error al actualizar usuario')
        }
      } else {
        const result = await createUser(data)
        if (result.success) {
          toast.success('Usuario creado correctamente')
        } else {
          toast.error(result.error || 'Error al crear usuario')
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [selectedUser, updateUser, createUser])

  const handleDeleteConfirm = useCallback(async () => {
    if (!selectedUser) return
    
    setIsSubmitting(true)
    try {
      const result = await deleteUser(selectedUser.id)
      if (result.success) {
        toast.success('Usuario eliminado correctamente')
      } else {
        toast.error(result.error || 'Error al eliminar usuario')
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [selectedUser, deleteUser])

  const handleFiltersChange = useCallback((newFilters: UserFiltersType) => {
    setFilters(newFilters)
    setPage(1)
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatsCards users={users} />

      {/* Header with actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Lista de Usuarios</h2>
          <p className="text-sm text-muted-foreground">
            Gestiona todos los usuarios del sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => refresh()}
            className="border-border text-foreground hover:bg-secondary"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
          <Button 
            onClick={handleCreate}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        </div>
      </div>

      {/* Filters */}
      <UserFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Table */}
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          pageSize={pagination.pageSize}
          onPageChange={setPage}
        />
      )}

      {/* Form Dialog */}
      <UserForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        user={selectedUser}
        onSubmit={handleFormSubmit}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        user={selectedUser}
        onConfirm={handleDeleteConfirm}
        isLoading={isSubmitting}
      />
    </div>
  )
}
