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
          'fixed left-0 top-0 z-50 h-screen w-64 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-sidebar-foreground transition-transform duration-300 lg:relative lg:z-0 lg:translate-x-0 shadow-2xl border-r border-slate-200/50 dark:border-slate-700/50',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 shadow-sm lg:hidden">
            <h2 className="font-bold text-slate-800 dark:text-slate-200">Navigation</h2>
            <button
              onClick={onClose}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-600/60 rounded-lg p-1 transition-colors"
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
                        'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group relative overflow-hidden shadow-sm',
                        isActive
                          ? 'bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#DC143C] text-white shadow-lg ring-2 ring-[#FFD700]/30 transform scale-[1.02]'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/80 hover:text-slate-900 dark:hover:text-slate-100 hover:shadow-md hover:translate-x-1 backdrop-blur-sm'
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
          <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 px-6 py-4 shadow-inner">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ministry of ICT &copy; 2026
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              Republic of Uganda
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
