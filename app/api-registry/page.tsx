'use client'

import { useState } from 'react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Search, Plus, Server } from 'lucide-react'

export default function APIRegistry() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [newApiData, setNewApiData] = useState({
    name: '',
    description: '',
    version: '',
    endpoint: '',
    ministry: '',
    category: 'REST',
    environment: 'production'
  })

  const filteredAPIs = apis.filter((api) => {
    const matchesSearch =
      api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.ministry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || api.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openRegisterModal = () => {
    setShowRegisterModal(true)
  }

  const resetForm = () => {
    setNewApiData({
      name: '',
      description: '',
      version: '',
      endpoint: '',
      ministry: '',
      category: 'REST',
      environment: 'production'
    })
  }

  const registerApi = () => {
    if (!newApiData.name || !newApiData.endpoint || !newApiData.ministry) return

    // Here you would typically make an API call to register the new API
    console.log('Registering API:', newApiData)

    setShowRegisterModal(false)
    resetForm()

    // Show success feedback or update the APIs list
  }

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
            onClick={openRegisterModal}
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

      {/* Register API Modal */}
      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-2xl backdrop-blur-sm">
          <DialogHeader className="pb-4 border-b border-slate-200 dark:border-slate-700">
            <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Server className="h-5 w-5 text-[#FFD700]" />
              Register New API
            </DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              Register your API to make it discoverable in the government API registry. Provide accurate information for better integration.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-6 mx-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apiName" className="text-slate-900 dark:text-slate-100 font-medium">API Name *</Label>
                <Input
                  id="apiName"
                  placeholder="e.g., Health Records API"
                  value={newApiData.name}
                  onChange={(e) => setNewApiData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="version" className="text-slate-900 dark:text-slate-100 font-medium">Version</Label>
                <Input
                  id="version"
                  placeholder="e.g., v1.0"
                  value={newApiData.version}
                  onChange={(e) => setNewApiData(prev => ({ ...prev, version: e.target.value }))}
                  className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-900 dark:text-slate-100 font-medium">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what your API does and its main functions..."
                value={newApiData.description}
                onChange={(e) => setNewApiData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endpoint" className="text-slate-900 dark:text-slate-100 font-medium">Base Endpoint URL *</Label>
              <Input
                id="endpoint"
                placeholder="https://api.health.gov.rw/v1"
                value={newApiData.endpoint}
                onChange={(e) => setNewApiData(prev => ({ ...prev, endpoint: e.target.value }))}
                className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ministry" className="text-slate-900 dark:text-slate-100 font-medium">Ministry *</Label>
                <Select
                  value={newApiData.ministry}
                  onValueChange={(value) => setNewApiData(prev => ({ ...prev, ministry: value }))}
                >
                  <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600">
                    <SelectValue placeholder="Select ministry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ministry of Health">Ministry of Health</SelectItem>
                    <SelectItem value="Ministry of Education">Ministry of Education</SelectItem>
                    <SelectItem value="Ministry of Finance">Ministry of Finance</SelectItem>
                    <SelectItem value="Ministry of Agriculture">Ministry of Agriculture</SelectItem>
                    <SelectItem value="Ministry of Justice">Ministry of Justice</SelectItem>
                    <SelectItem value="Ministry of ICT">Ministry of ICT</SelectItem>
                    <SelectItem value="Ministry of Trade">Ministry of Trade</SelectItem>
                    <SelectItem value="Ministry of Defense">Ministry of Defense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-900 dark:text-slate-100 font-medium">API Type</Label>
                <Select
                  value={newApiData.category}
                  onValueChange={(value) => setNewApiData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REST">REST API</SelectItem>
                    <SelectItem value="GraphQL">GraphQL</SelectItem>
                    <SelectItem value="SOAP">SOAP</SelectItem>
                    <SelectItem value="Webhook">Webhook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="environment" className="text-slate-900 dark:text-slate-100 font-medium">Environment</Label>
              <Select
                value={newApiData.environment}
                onValueChange={(value) => setNewApiData(prev => ({ ...prev, environment: value }))}
              >
                <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setShowRegisterModal(false)
                resetForm()
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={registerApi}
              disabled={!newApiData.name || !newApiData.endpoint || !newApiData.ministry}
              className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-medium disabled:opacity-50"
            >
              Register API
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
