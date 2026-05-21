'use client'

import { useState, useEffect } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { ChartContainer } from '@/components/monitoring/chart-container'
import { RequestsChart } from '@/components/monitoring/requests-chart'
import { ResponseTimeChart } from '@/components/monitoring/response-time-chart'
import { ErrorRateChart } from '@/components/monitoring/error-rate-chart'
import { DataVolumeChart } from '@/components/monitoring/data-volume-chart'
import {
  generateHourlyMetrics,
  generateResponseTimeData,
  generateErrorRateData,
  generateDataVolumeData,
} from '@/lib/mock-data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Monitoring() {
  const [timeRange, setTimeRange] = useState('24h')
  const [requestsData, setRequestsData] = useState(generateHourlyMetrics())
  const [responseTimeData] = useState(generateResponseTimeData())
  const [errorRateData] = useState(generateErrorRateData())
  const [dataVolumeData] = useState(generateDataVolumeData())

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRequestsData((prev) => {
        const newData = [...prev.slice(1)]
        const lastTime = prev[prev.length - 1].time
        const [hours, minutes] = lastTime.split(':').map(Number)
        let newHour = hours
        let newMinute = minutes + 1
        if (newMinute === 60) {
          newHour = (newHour + 1) % 24
          newMinute = 0
        }
        const newTimeStr = `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`
        newData.push({
          time: newTimeStr,
          requests: Math.floor(Math.random() * 2000 + 1000),
          errors: Math.floor(Math.random() * 50 + 10),
        })
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <MainLayout>
      <BreadcrumbNav />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Monitoring</h1>
            <p className="text-muted-foreground mt-1">
              Real-time system performance and API metrics
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full md:w-48 mt-4 md:mt-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last 1 Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer
            title="API Requests"
            description="Total requests and errors over time"
          >
            <RequestsChart data={requestsData} />
          </ChartContainer>

          <ChartContainer
            title="Error Rate Distribution"
            description="Percentage of errors by endpoint"
          >
            <ErrorRateChart data={errorRateData} />
          </ChartContainer>

          <ChartContainer
            title="Response Time Analysis"
            description="Min, average, and max response times"
          >
            <ResponseTimeChart data={responseTimeData} />
          </ChartContainer>

          <ChartContainer
            title="Data Transfer Volume"
            description="Incoming and outgoing data trends"
          >
            <DataVolumeChart data={dataVolumeData} />
          </ChartContainer>
        </div>
      </div>
    </MainLayout>
  )
}
