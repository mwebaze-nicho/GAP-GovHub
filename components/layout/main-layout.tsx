'use client'

import { useState } from 'react'
import { AppHeader } from './app-header'
import { AppSidebar } from './app-sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-sm">
          <div className="container mx-auto p-4 md:p-6 space-y-6">
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 dark:border-slate-700/20 p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
