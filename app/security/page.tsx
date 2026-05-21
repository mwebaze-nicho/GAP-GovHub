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

export default function Security() {
  const [visibleKeys, setVisibleKeys] = useState<string[]>([])
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

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
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Generate New Key
              </Button>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableHead>Name</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((keyItem) => {
                    const isVisible = visibleKeys.includes(keyItem.id)

                    return (
                      <TableRow key={keyItem.id}>
                        <TableCell>
                          <p className="font-medium text-foreground">{keyItem.name}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-muted-foreground">
                              {isVisible ? keyItem.key : maskKey(keyItem.key)}
                            </code>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(keyItem.createdAt)}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
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
                            <button
                              onClick={() => toggleKeyVisibility(keyItem.id)}
                              className="p-1 hover:bg-muted rounded transition-colors"
                              title={isVisible ? 'Hide key' : 'Show key'}
                            >
                              {isVisible ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => copyToClipboard(keyItem.key, keyItem.id)}
                              className="p-1 hover:bg-muted rounded transition-colors"
                              title="Copy key"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button
                              className="p-1 hover:bg-red-100 dark:hover:bg-red-950 rounded transition-colors text-red-600"
                              title="Delete key"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6 mt-6">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableHead>Event</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Severity</TableHead>
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
                      <TableRow key={log.id}>
                        <TableCell>
                          <p className="font-medium text-foreground">{log.event}</p>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {log.user}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {log.timestamp.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
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
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
