import { UserManagement } from '@/components/users'
import { Toaster } from 'sonner'
import { Users } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Toaster 
        position="top-right" 
        richColors 
        theme="dark"
        toastOptions={{
          style: {
            background: 'oklch(0.14 0 0)',
            border: '1px solid oklch(0.25 0 0)',
            color: 'oklch(0.95 0 0)',
          },
        }}
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Sistema de Gestión de Usuarios
                </h1>
                <p className="text-xs text-muted-foreground">
                  Panel de administración
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <UserManagement />
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/30 mt-auto">
          <div className="container mx-auto px-4 py-4">
            <p className="text-center text-sm text-muted-foreground">
              Sistema de Gestión de Usuarios &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
