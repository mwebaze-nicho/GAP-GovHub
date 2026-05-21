'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { MetricsCard } from '@/components/dashboard/metrics-card'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { dashboardMetrics, activityFeed } from '@/lib/mock-data'
import { Zap, Users, TrendingUp, Gauge, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const router = useRouter()
  const [metrics, setMetrics] = useState(dashboardMetrics)
  const [activity, setActivity] = useState(activityFeed)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 5 - 2),
        todayCalls: prev.todayCalls + Math.floor(Math.random() * 100 + 50),
        uptime: Math.min(100, prev.uptime + (Math.random() * 0.01)),
      }))
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
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome to GovHub - Government API Gateway
            </p>
          </div>
          <Button
            onClick={() => router.push('/integration-wizard')}
            className="mt-4 md:mt-0 w-full md:w-auto bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Connection
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricsCard
            title="Total APIs"
            value={metrics.totalApis}
            trend={12}
            isPositive={true}
            icon={<Zap className="h-6 w-6" />}
          />
          <MetricsCard
            title="Active Connections"
            value={metrics.activeConnections}
            trend={8}
            isPositive={true}
            icon={<Users className="h-6 w-6" />}
          />
          <MetricsCard
            title="Today's API Calls"
            value={metrics.todayCalls.toLocaleString()}
            trend={15}
            isPositive={true}
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <MetricsCard
            title="System Uptime"
            value={metrics.uptime.toFixed(2)}
            unit="%"
            trend={0.5}
            isPositive={true}
            icon={<Gauge className="h-6 w-6" />}
          />
        </div>

        {/* Activity Feed */}
        <ActivityFeed activities={activity} title="Recent Activity" />
      </div>
    </MainLayout>
  )
}
