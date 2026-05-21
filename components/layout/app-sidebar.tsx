'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Layers,
  Activity,
  Zap,
  BookOpen,
  Wand2,
  Lock,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AppSidebarProps {
  open?: boolean
  onClose?: () => void
}

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/api-registry', icon: Layers, label: 'API Registry' },
  { href: '/monitoring', icon: Activity, label: 'Monitoring' },
  { href: '/data-transformation', icon: Zap, label: 'Data Transformation' },
  { href: '/api-docs', icon: BookOpen, label: 'Documentation' },
  { href: '/integration-wizard', icon: Wand2, label: 'Integration Wizard' },
  { href: '/security', icon: Lock, label: 'Security' },
]

export function AppSidebar({ open = false, onClose }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 border-r border-border bg-gradient-to-b from-sidebar to-sidebar/95 backdrop-blur-sm text-sidebar-foreground transition-transform duration-300 lg:relative lg:z-0 lg:translate-x-0 shadow-lg',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-sidebar-border lg:hidden">
            <h2 className="font-bold">Navigation</h2>
            <button
              onClick={onClose}
              className="text-sidebar-foreground hover:opacity-70"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-6">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href))

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 group relative overflow-hidden',
                        isActive
                          ? 'bg-gradient-to-r from-[#FFD700] to-[#DC143C] text-white shadow-md border border-[#FFD700]/20'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm hover:translate-x-1'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border px-6 py-4">
            <p className="text-xs text-sidebar-foreground/60">
              Ministry of ICT &copy; 2024
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
