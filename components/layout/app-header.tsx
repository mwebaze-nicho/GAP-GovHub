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
    <header className="border-b border-border bg-gradient-to-r from-card to-card/80 backdrop-blur-sm">
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
            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow-lg p-1">
              <UgandaCoatOfArms className="h-8 w-8 object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-foreground">GovHub</h1>
              <span className="text-xs text-muted-foreground">API Gateway</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <UgandaFlag className="h-6 w-8 rounded-sm shadow-sm" />
            <span className="text-sm font-medium text-muted-foreground hidden sm:block">
              Republic of Uganda
            </span>
          </div>
          <div className="h-6 w-px bg-border" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-foreground hover:bg-accent"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
