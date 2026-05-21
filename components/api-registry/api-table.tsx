'use client'

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
import { Eye, Settings } from 'lucide-react'

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
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted">
            <TableHead>API Name</TableHead>
            <TableHead>Ministry</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Calls/Day</TableHead>
            <TableHead className="text-right">Response Time</TableHead>
            <TableHead className="text-right">Uptime</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apis.map((api) => {
            const statusInfo = statusConfig[api.status]
            return (
              <TableRow key={api.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{api.name}</p>
                    <p className="text-xs text-muted-foreground">{api.version}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{api.ministry}</TableCell>
                <TableCell>
                  <Badge className={statusInfo.badge}>{statusInfo.label}</Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {api.callsPerDay.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {api.responseTime}ms
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-sm font-medium text-green-600">
                    {api.uptime}%
                  </span>
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
    </div>
  )
}
