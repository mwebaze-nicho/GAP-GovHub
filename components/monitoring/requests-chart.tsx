'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useTheme } from 'next-themes'

interface RequestsChartProps {
  data: Array<{
    time: string
    requests: number
    errors: number
  }>
}

export function RequestsChart({ data }: RequestsChartProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const textColor = isDark ? '#e5e7eb' : '#374151'
  const gridColor = isDark ? '#374151' : '#e5e7eb'

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="time"
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
        <Line
          type="monotone"
          dataKey="requests"
          stroke="#FFD700"
          strokeWidth={2}
          dot={false}
          name="Total Requests"
        />
        <Line
          type="monotone"
          dataKey="errors"
          stroke="#DC143C"
          strokeWidth={2}
          dot={false}
          name="Errors"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
