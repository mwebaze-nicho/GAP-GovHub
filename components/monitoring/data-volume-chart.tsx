'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useTheme } from 'next-themes'

interface DataVolumeChartProps {
  data: Array<{
    date: string
    incoming: number
    outgoing: number
  }>
}

export function DataVolumeChart({ data }: DataVolumeChartProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const textColor = isDark ? '#e5e7eb' : '#374151'
  const gridColor = isDark ? '#374151' : '#e5e7eb'

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="date"
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
        <Area
          type="monotone"
          dataKey="incoming"
          stackId="1"
          stroke="#FFD700"
          fill="#FFD700"
          name="Incoming Data (MB)"
          opacity={0.8}
        />
        <Area
          type="monotone"
          dataKey="outgoing"
          stackId="1"
          stroke="#3182CE"
          fill="#3182CE"
          name="Outgoing Data (MB)"
          opacity={0.8}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
