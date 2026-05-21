import { Card } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricsCardProps {
  title: string
  value: string | number
  unit?: string
  trend?: number
  isPositive?: boolean
  icon?: React.ReactNode
  className?: string
}

export function MetricsCard({
  title,
  value,
  unit,
  trend,
  isPositive = true,
  icon,
  className,
}: MetricsCardProps) {
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600'

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <TrendIcon className={cn('h-4 w-4', trendColor)} />
              <span className={cn('text-xs font-medium', trendColor)}>
                {Math.abs(trend)}% {isPositive ? 'increase' : 'decrease'}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
