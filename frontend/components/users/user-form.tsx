'use client'

import { useState, useEffect } from 'react'
import type { User, CreateUserDTO } from '@/types/user'
import { countries } from '@/lib/data/users'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface UserFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: User | null
  onSubmit: (data: CreateUserDTO) => Promise<void>
  isLoading?: boolean
}

const initialFormState: CreateUserDTO = {
  nombre: '',
  edad: 0,
  telefono: '',
  direccion: '',
  pais: '',
  estadoCivil: 'soltero',
}

export function UserForm({ open, onOpenChange, user, onSubmit, isLoading }: UserFormProps) {
  const [formData, setFormData] = useState<CreateUserDTO>(initialFormState)
  const [errors, setErrors] = useState<Partial<Record<keyof CreateUserDTO, string>>>({})

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre,
        edad: user.edad,
        telefono: user.telefono,
        direccion: user.direccion,
        pais: user.pais,
        estadoCivil: user.estadoCivil,
      })
    } else {
      setFormData(initialFormState)
    }
    setErrors({})
  }, [user, open])

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateUserDTO, string>> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.edad || formData.edad < 1 || formData.edad > 120) {
      newErrors.edad = 'La edad debe estar entre 1 y 120'
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido'
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida'
    }

    if (!formData.pais) {
      newErrors.pais = 'El país es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return

    await onSubmit(formData)
    onOpenChange(false)
  }

  const isEditing = !!user

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isEditing 
              ? 'Modifica los datos del usuario.' 
              : 'Completa los datos para crear un nuevo usuario.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-foreground">Nombre</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Nombre completo"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edad" className="text-foreground">Edad</Label>
              <Input
                id="edad"
                type="number"
                min={1}
                max={120}
                value={formData.edad || ''}
                onChange={(e) => setFormData({ ...formData, edad: parseInt(e.target.value) || 0 })}
                placeholder="25"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
              {errors.edad && (
                <p className="text-sm text-destructive">{errors.edad}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-foreground">Teléfono</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                placeholder="+1 234 567 8900"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
              {errors.telefono && (
                <p className="text-sm text-destructive">{errors.telefono}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion" className="text-foreground">Dirección</Label>
            <Input
              id="direccion"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              placeholder="Calle, número, ciudad"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            {errors.direccion && (
              <p className="text-sm text-destructive">{errors.direccion}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pais" className="text-foreground">País</Label>
            <Select
              value={formData.pais}
              onValueChange={(value) => setFormData({ ...formData, pais: value })}
            >
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue placeholder="Selecciona un país" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {countries.map((country) => (
                  <SelectItem key={country} value={country} className="focus:bg-secondary">
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.pais && (
              <p className="text-sm text-destructive">{errors.pais}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Estado Civil</Label>
            <RadioGroup
              value={formData.estadoCivil}
              onValueChange={(value: 'casado' | 'soltero') => 
                setFormData({ ...formData, estadoCivil: value })
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="soltero" 
                  id="soltero"
                  className="border-border text-primary"
                />
                <Label htmlFor="soltero" className="text-muted-foreground cursor-pointer">
                  Soltero
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="casado" 
                  id="casado"
                  className="border-border text-primary"
                />
                <Label htmlFor="casado" className="text-muted-foreground cursor-pointer">
                  Casado
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border text-foreground hover:bg-secondary"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Guardando...
                </>
              ) : (
                isEditing ? 'Guardar cambios' : 'Crear usuario'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
