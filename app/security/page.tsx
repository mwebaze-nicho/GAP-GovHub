'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { apiKeys, auditLogs } from '@/lib/mock-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lock, Copy, Trash2, Eye, EyeOff, Plus, AlertCircle } from 'lucide-react'
import { OverflowIndicator } from '@/components/ui/overflow-indicator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Security() {
  const [visibleKeys, setVisibleKeys] = useState<string[]>([])
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [apiKeysList, setApiKeysList] = useState(apiKeys)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newKeyData, setNewKeyData] = useState({
    name: '',
    ministry: '',
    environment: 'production',
    permissions: ['read', 'write']
  })

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys((prev) =>
      prev.includes(keyId) ? prev.filter((id) => id !== keyId) : [...prev, keyId]
    )
  }

  const copyToClipboard = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(keyId)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const maskKey = (key: string) => {
    return key.slice(0, 7) + '*'.repeat(key.length - 12) + key.slice(-5)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const generateRandomKey = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const keyParts = [
      'gov',
      Math.random() < 0.5 ? 'prod' : 'dev',
      Array.from({length: 8}, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('')
    ]
    return keyParts.join('_')
  }

  const openCreateModal = () => {
    setShowCreateModal(true)
  }

  const resetForm = () => {
    setNewKeyData({
      name: '',
      ministry: '',
      environment: 'production',
      permissions: ['read', 'write']
    })
  }

  const createApiKey = () => {
    if (!newKeyData.name || !newKeyData.ministry) return

    const newKey = {
      id: `key-${Date.now()}`,
      name: newKeyData.name,
      key: generateRandomKey(),
      createdAt: new Date(),
      lastUsed: new Date(),
      permissions: newKeyData.permissions
    }

    setApiKeysList(prev => [newKey, ...prev])
    setShowCreateModal(false)
    resetForm()

    // Show success feedback
    setCopiedKey(newKey.id)
    setTimeout(() => setCopiedKey(null), 3000)
  }

  return (
    <MainLayout>
      <BreadcrumbNav />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Security</h1>
            <p className="text-muted-foreground mt-1">
              Manage API keys and security settings
            </p>
          </div>
        </div>

        {/* Security Alert */}
        <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 p-4 flex gap-4">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-900 dark:text-yellow-100">
              Security Best Practices
            </p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
              Rotate your API keys regularly and never share them publicly
            </p>
          </div>
        </Card>

        <Tabs defaultValue="keys" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="keys">API Keys</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="keys" className="space-y-6 mt-6">
            <div className="flex justify-end">
              <Button
                onClick={openCreateModal}
                className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-medium"
              >
                <Plus className="h-4 w-4 mr-2" />
                Generate New Key
              </Button>
            </div>

            <OverflowIndicator
              direction="horizontal"
              className="border border-slate-200/60 dark:border-slate-700/60 rounded-lg shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 ring-1 ring-slate-200/10 dark:ring-slate-700/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
            >
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-slate-100 hover:to-slate-50 dark:hover:from-slate-700 dark:hover:to-slate-800 border-b border-slate-200/60 dark:border-slate-700/60">
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Name</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">API Key</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Created</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Last Used</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Permissions</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeysList.map((keyItem) => {
                    const isVisible = visibleKeys.includes(keyItem.id)

                    return (
                      <TableRow key={keyItem.id} className="border-b border-slate-200/40 dark:border-slate-700/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <TableCell>
                          <p className="font-medium text-slate-900 dark:text-slate-100">{keyItem.name}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-muted-foreground">
                              {isVisible ? keyItem.key : maskKey(keyItem.key)}
                            </code>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
                          {formatDate(keyItem.createdAt)}
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
                          {formatDate(keyItem.lastUsed)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {keyItem.permissions.map((perm) => (
                              <Badge key={perm} variant="secondary" className="text-xs">
                                {perm}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <button
                                onClick={() => toggleKeyVisibility(keyItem.id)}
                                className="h-4 w-4"
                                title={isVisible ? 'Hide key' : 'Show key'}
                              >
                                {isVisible ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <button
                                onClick={() => copyToClipboard(keyItem.key, keyItem.id)}
                                className="h-4 w-4"
                                title="Copy key"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-950">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </OverflowIndicator>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6 mt-6">
            <OverflowIndicator
              direction="horizontal"
              className="border border-slate-200/60 dark:border-slate-700/60 rounded-lg shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 ring-1 ring-slate-200/10 dark:ring-slate-700/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
            >
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-slate-100 hover:to-slate-50 dark:hover:from-slate-700 dark:hover:to-slate-800 border-b border-slate-200/60 dark:border-slate-700/60">
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Event</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">User</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Timestamp</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Details</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => {
                    const severityConfig = {
                      critical: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200',
                      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
                      info: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
                    }

                    return (
                      <TableRow key={log.id} className="border-b border-slate-200/40 dark:border-slate-700/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <TableCell>
                          <p className="font-medium text-slate-900 dark:text-slate-100">{log.event}</p>
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
                          {log.user}
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
                          {log.timestamp.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
                          {log.details}
                        </TableCell>
                        <TableCell>
                          <Badge className={severityConfig[log.severity as keyof typeof severityConfig]}>
                            {log.severity}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </OverflowIndicator>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create API Key Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-2xl backdrop-blur-sm">
          <DialogHeader className="pb-4 border-b border-slate-200 dark:border-slate-700">
            <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Lock className="h-5 w-5 text-[#FFD700]" />
              Generate New API Key
            </DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              Create a new API key for government system integration. Choose the ministry and environment carefully.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-6 mx-2">
            <div className="space-y-2">
              <Label htmlFor="keyName" className="text-slate-900 dark:text-slate-100 font-medium">API Key Name *</Label>
              <Input
                id="keyName"
                placeholder="e.g., Health Ministry Production"
                value={newKeyData.name}
                onChange={(e) => setNewKeyData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ministry" className="text-slate-900 dark:text-slate-100 font-medium">Ministry *</Label>
              <Select
                value={newKeyData.ministry}
                onValueChange={(value) => setNewKeyData(prev => ({ ...prev, ministry: value }))}
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
              <Label htmlFor="environment" className="text-slate-900 dark:text-slate-100 font-medium">Environment</Label>
              <Select
                value={newKeyData.environment}
                onValueChange={(value) => setNewKeyData(prev => ({ ...prev, environment: value }))}
              >
                <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                  Security Notice
                </span>
              </div>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                The API key will be generated with read/write permissions. Store it securely and never share it publicly.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false)
                resetForm()
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={createApiKey}
              disabled={!newKeyData.name || !newKeyData.ministry}
              className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-medium disabled:opacity-50"
            >
              Generate Key
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
