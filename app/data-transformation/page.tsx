'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function DataTransformation() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const transformations = [
    {
      id: 1,
      name: 'Patient Record Normalization',
      source: 'Health Ministry API',
      target: 'National Data Hub',
      status: 'active',
      mappings: 12,
      code: `{
  "sourceFields": ["patientID", "fullName", "dob"],
  "targetFields": ["national_id", "name", "birth_date"],
  "transformRules": [
    {"field": "patientID", "type": "map", "target": "national_id"},
    {"field": "fullName", "type": "split", "target": ["first_name", "last_name"]},
    {"field": "dob", "type": "format", "format": "YYYY-MM-DD"}
  ]
}`,
    },
    {
      id: 2,
      name: 'Education System Integration',
      source: 'Ministry of Education API',
      target: 'Student Portal',
      status: 'active',
      mappings: 18,
      code: `{
  "sourceFields": ["schoolCode", "studentName", "enrollmentDate"],
  "targetFields": ["school_id", "student_name", "enrollment"],
  "transformRules": [
    {"field": "schoolCode", "type": "lookup", "table": "school_registry"},
    {"field": "studentName", "type": "uppercase"},
    {"field": "enrollmentDate", "type": "dateparse"}
  ]
}`,
    },
    {
      id: 3,
      name: 'Tax Data Aggregation',
      source: 'URA API',
      target: 'Finance Dashboard',
      status: 'maintenance',
      mappings: 8,
      code: `{
  "sourceFields": ["taxpayerID", "totalTax", "quarter"],
  "targetFields": ["taxpayer", "amount", "period"],
  "transformRules": [
    {"field": "taxpayerID", "type": "anonymize"},
    {"field": "totalTax", "type": "aggregate", "method": "sum"},
    {"field": "quarter", "type": "rollup", "level": "annual"}
  ]
}`,
    },
  ]

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <MainLayout>
      <BreadcrumbNav />

      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Data Transformation</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Transform and normalize data between government APIs
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <Zap className="h-4 w-4 mr-2" />
            Create Transformation
          </Button>
        </div>

        {/* Transformations Grid */}
        <div className="grid gap-4 sm:gap-6">
          {transformations.map((transform) => (
            <Card key={transform.id} className="p-4 sm:p-6">
              <div className="space-y-6 xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-8">
                {/* Left Column */}
                <div>
                  <div className="space-y-4 sm:space-y-0 sm:flex sm:items-start sm:justify-between mb-6">
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground">
                        {transform.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {transform.source} → {transform.target}
                      </p>
                    </div>
                    <Badge
                      className={
                        transform.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200'
                      }
                    >
                      {transform.status === 'active' ? 'Active' : 'Maintenance'}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Field Mappings:</span>
                      <span className="font-medium text-foreground">{transform.mappings}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Test
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Deploy
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Code */}
                <div>
                  <div className="relative border border-border rounded-lg overflow-x-auto">
                    <pre className="bg-muted p-3 sm:p-4 text-xs font-mono text-muted-foreground whitespace-pre">
                      <code>{transform.code}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(transform.code, transform.id.toString())}
                      className="absolute top-2 right-2 p-1.5 sm:p-2 bg-primary/20 hover:bg-primary/30 rounded transition-colors"
                    >
                      {copiedCode === transform.id.toString() ? (
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
