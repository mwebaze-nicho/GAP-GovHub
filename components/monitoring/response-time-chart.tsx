'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useTheme } from 'next-themes'

interface ResponseTimeChartProps {
  data: Array<{
    endpoint: string
    avgTime: number
    minTime: number
    maxTime: number
  }>
}

export function ResponseTimeChart({ data }: ResponseTimeChartProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const textColor = isDark ? '#e5e7eb' : '#374151'
  const gridColor = isDark ? '#374151' : '#e5e7eb'

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="endpoint"
          stroke={textColor}
          style={{ fontSize: '12px' }}
        />
        <YAxis stroke={textColor} style={{ fontSize: '12px' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            border: `1px solid ${gridColor}`,
            borderRadius: '8px',
          }}
          textStyle={{ color: textColor }}
        />
        <Legend wrapperStyle={{ color: textColor }} />
        <Bar dataKey="minTime" fill="#3182CE" name="Min (ms)" />
        <Bar dataKey="avgTime" fill="#FFD700" name="Avg (ms)" />
        <Bar dataKey="maxTime" fill="#DC143C" name="Max (ms)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
