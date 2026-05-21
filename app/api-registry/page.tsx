'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { APITable } from '@/components/api-registry/api-table'
import { apis } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Plus } from 'lucide-react'

export default function APIRegistry() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredAPIs = apis.filter((api) => {
    const matchesSearch =
      api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.ministry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || api.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <MainLayout>
      <BreadcrumbNav />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">API Registry</h1>
            <p className="text-muted-foreground mt-1">
              Discover and manage all government APIs
            </p>
          </div>
          <Button
            onClick={() => router.push('/integration-wizard')}
            className="mt-4 md:mt-0 w-full md:w-auto bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Register API
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-slate-50/80 to-white dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 group-focus-within:text-[#FFD700] transition-colors" />
            <Input
              placeholder="Search APIs or ministries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 bg-white/70 dark:bg-slate-900/70 border-slate-200/60 dark:border-slate-700/60 focus-visible:border-[#FFD700] focus-visible:ring-[#FFD700]/20 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 h-10 bg-white/70 dark:bg-slate-900/70">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Info */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredAPIs.length} of {apis.length} APIs
        </div>

        {/* Table */}
        <APITable apis={filteredAPIs} />
      </div>
    </MainLayout>
  )
}
