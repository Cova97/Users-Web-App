'use client'

import type { UserFilters as UserFiltersType } from '@/types/user'
import { countries } from '@/lib/data/users'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'

interface UserFiltersProps {
  filters: UserFiltersType
  onFiltersChange: (filters: UserFiltersType) => void
}

export function UserFilters({ filters, onFiltersChange }: UserFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value })
  }

  const handleCountryChange = (value: string) => {
    onFiltersChange({ ...filters, pais: value === 'todos' ? undefined : value })
  }

  const handleStatusChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      estadoCivil: value as 'casado' | 'soltero' | 'todos'
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      pais: undefined,
      estadoCivil: 'todos',
    })
  }

  const hasActiveFilters = filters.search || filters.pais || (filters.estadoCivil && filters.estadoCivil !== 'todos')

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, dirección..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <Select
          value={filters.pais || 'todos'}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-input border-border text-foreground">
            <SelectValue placeholder="País" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="todos" className="focus:bg-secondary">
              Todos los países
            </SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country} className="focus:bg-secondary">
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.estadoCivil || 'todos'}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-full sm:w-[160px] bg-input border-border text-foreground">
            <SelectValue placeholder="Estado civil" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="todos" className="focus:bg-secondary">
              Todos
            </SelectItem>
            <SelectItem value="soltero" className="focus:bg-secondary">
              Soltero
            </SelectItem>
            <SelectItem value="casado" className="focus:bg-secondary">
              Casado
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <X className="mr-2 h-4 w-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  )
}
