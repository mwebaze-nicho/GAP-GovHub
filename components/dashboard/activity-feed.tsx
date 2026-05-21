import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OverflowIndicator } from '@/components/ui/overflow-indicator'

interface Activity {
  id: number
  action: string
  description: string
  timestamp: Date
  status: 'success' | 'warning' | 'info' | 'error'
}

interface ActivityFeedProps {
  activities: Activity[]
  title?: string
}

const statusConfig = {
  success: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950' },
  warning: { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-950' },
  info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950' },
  error: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950' },
}

export function ActivityFeed({ activities, title = 'Recent Activity' }: ActivityFeedProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <OverflowIndicator
        direction="vertical"
        className="border border-slate-200/60 dark:border-slate-700/60 rounded-lg shadow-sm max-h-96"
      >
        <div className="space-y-4 p-4">
          {activities.map((activity) => {
            const config = statusConfig[activity.status]
            const Icon = config.icon

            return (
              <div key={activity.id} className={cn("flex gap-4 p-3 rounded-lg", config.bg)}>
                <div className="flex-shrink-0">
                  <Icon className={cn('h-5 w-5', config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs whitespace-nowrap">
                      {formatTime(activity.timestamp)}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </OverflowIndicator>
    </Card>
  )
}

function formatTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString()
}
