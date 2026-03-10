'use client'

import type { User } from '@/types/user'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

interface UserTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  isLoading?: boolean
}

export function UserTable({ users, onEdit, onDelete, isLoading }: UserTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-card">
        <div className="p-8 text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="mt-2 text-sm text-muted-foreground">Cargando usuarios...</p>
        </div>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card">
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No se encontraron usuarios</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-medium">Nombre</TableHead>
            <TableHead className="text-muted-foreground font-medium">Edad</TableHead>
            <TableHead className="text-muted-foreground font-medium">Teléfono</TableHead>
            <TableHead className="text-muted-foreground font-medium hidden md:table-cell">Dirección</TableHead>
            <TableHead className="text-muted-foreground font-medium">País</TableHead>
            <TableHead className="text-muted-foreground font-medium">Estado Civil</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-border hover:bg-secondary/50">
              <TableCell className="font-medium text-foreground">{user.nombre}</TableCell>
              <TableCell className="text-muted-foreground">{user.edad} años</TableCell>
              <TableCell className="text-muted-foreground">{user.telefono}</TableCell>
              <TableCell className="text-muted-foreground hidden md:table-cell max-w-[200px] truncate">
                {user.direccion}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="border-border text-muted-foreground">
                  {user.pais}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  className={
                    user.estadoCivil === 'casado' 
                      ? 'bg-primary/20 text-primary border-primary/30' 
                      : 'bg-secondary text-secondary-foreground'
                  }
                >
                  {user.estadoCivil === 'casado' ? 'Casado' : 'Soltero'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menú</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    <DropdownMenuItem 
                      onClick={() => onEdit(user)}
                      className="cursor-pointer focus:bg-secondary"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(user)}
                      className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
