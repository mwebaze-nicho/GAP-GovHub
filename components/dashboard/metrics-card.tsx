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
    <Card className={cn('p-6 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
            {unit && <span className="text-sm text-slate-500 dark:text-slate-500">{unit}</span>}
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
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-[#FFD700]/20 to-[#DC143C]/20 text-[#DC143C] dark:text-[#FFD700] shadow-md">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
