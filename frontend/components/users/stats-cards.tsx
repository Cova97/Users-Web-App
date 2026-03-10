'use client'

import type { User } from '@/types/user'
import { Users, UserCheck, UserX, Globe } from 'lucide-react'

interface StatsCardsProps {
  users: User[]
}

export function StatsCards({ users }: StatsCardsProps) {
  const totalUsers = users.length
  const casados = users.filter(u => u.estadoCivil === 'casado').length
  const solteros = users.filter(u => u.estadoCivil === 'soltero').length
  const uniqueCountries = new Set(users.map(u => u.pais)).size

  const stats = [
    {
      label: 'Total Usuarios',
      value: totalUsers,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Casados',
      value: casados,
      icon: UserCheck,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
    },
    {
      label: 'Solteros',
      value: solteros,
      icon: UserX,
      color: 'text-chart-3',
      bgColor: 'bg-chart-3/10',
    },
    {
      label: 'Países',
      value: uniqueCountries,
      icon: Globe,
      color: 'text-chart-1',
      bgColor: 'bg-chart-1/10',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
