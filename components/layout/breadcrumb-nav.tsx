'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export function BreadcrumbNav() {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ label: 'Dashboard', href: '/' }]

    let currentPath = ''
    segments.forEach((segment) => {
      currentPath += `/${segment}`
      const label = segment
        .replace(/-/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      breadcrumbs.push({ label, href: currentPath })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => {
        const isFirst = index === 0
        const isLast = index === breadcrumbs.length - 1

        return (
          <div key={crumb.href} className="flex items-center gap-2">
            {isFirst ? (
              <>
                <Link
                  href={crumb.href}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>{crumb.label}</span>
                </Link>
                {breadcrumbs.length > 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </>
            ) : isLast ? (
              <span className="text-sm font-medium text-foreground">{crumb.label}</span>
            ) : (
              <>
                <Link
                  href={crumb.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </>
            )}
          </div>
        )
      })}
    </nav>
  )
}
