'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UgandaFlag } from '@/components/icons/uganda-flag'
import { UgandaCoatOfArms } from '@/components/icons/uganda-coat-of-arms'

interface AppHeaderProps {
  onMenuClick?: () => void
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-lg border-b border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden hover:bg-accent rounded-md p-1 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 flex items-center justify-center shadow-xl ring-2 ring-[#FFD700]/30 p-1.5 sm:p-2">
              <UgandaCoatOfArms className="h-6 w-6 sm:h-8 sm:w-8 object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg font-bold text-foreground">GovHub</h1>
              <span className="text-xs text-muted-foreground hidden sm:block">API Gateway</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-md">
            <UgandaFlag className="h-4 w-6 sm:h-5 sm:w-7 rounded-sm shadow-sm ring-1 ring-slate-200 dark:ring-slate-700" />
            <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:block">
              Republic of Uganda
            </span>
          </div>
          <div className="h-6 sm:h-8 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent hidden sm:block" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-foreground hover:bg-white/60 dark:hover:bg-slate-800/60 backdrop-blur-sm rounded-lg shadow-sm h-8 w-8 sm:h-10 sm:w-10"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
