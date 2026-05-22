'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Settings, Copy, CheckCircle } from 'lucide-react'
import { OverflowIndicator } from '@/components/ui/overflow-indicator'

interface API {
  id: string
  name: string
  ministry: string
  status: 'active' | 'maintenance' | 'error'
  endpoint: string
  callsPerDay: number
  uptime: number
  responseTime: number
  version: string
  apiKey?: string
  authType?: string
}

interface APITableProps {
  apis: API[]
}

const statusConfig = {
  active: {
    badge: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
    label: 'Active',
  },
  maintenance: {
    badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
    label: 'Maintenance',
  },
  error: {
    badge: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200',
    label: 'Error',
  },
}

export function APITable({ apis }: APITableProps) {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const copyToClipboard = (endpoint: string, apiId: string) => {
    navigator.clipboard.writeText(endpoint)
    setCopiedEndpoint(apiId)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  return (
    <OverflowIndicator
      direction="horizontal"
      className="border border-slate-200/60 dark:border-slate-700/60 rounded-lg shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 ring-1 ring-slate-200/10 dark:ring-slate-700/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-slate-100 hover:to-slate-50 dark:hover:from-slate-700 dark:hover:to-slate-800 border-b border-slate-200/60 dark:border-slate-700/60">
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">API Name</TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Endpoint</TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Status</TableHead>
            <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apis.map((api) => {
            const statusInfo = statusConfig[api.status]

            return (
              <TableRow key={api.id} className="border-b border-slate-200/40 dark:border-slate-700/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <TableCell>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{api.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{api.version}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-muted-foreground truncate max-w-xs">
                      {api.endpoint}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => copyToClipboard(api.endpoint, api.id)}
                      title="Copy endpoint URL"
                    >
                      {copiedEndpoint === api.id ? (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusInfo.badge}>{statusInfo.label}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </OverflowIndicator>
  )
}
