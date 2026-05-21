'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { BookOpen, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function APIDocs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const apis = [
    {
      id: 'health-api',
      name: 'Patient Records API',
      version: 'v1.2.3',
      description: 'Retrieve and manage patient medical records',
      endpoint: 'https://api.health.gov.ug/v1/patients',
      methods: ['GET', 'POST', 'PUT'],
      getExample: `curl -X GET \\
  https://api.health.gov.ug/v1/patients/12345 \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Accept: application/json'`,
      getResponse: `{
  "id": "12345",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1985-05-15",
  "conditions": ["hypertension", "diabetes"],
  "lastVisit": "2024-05-20"
}`,
      postExample: `curl -X POST \\
  https://api.health.gov.ug/v1/patients \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "dob": "1990-03-20"
  }'`,
    },
    {
      id: 'education-api',
      name: 'Education Management API',
      version: 'v2.0.0',
      description: 'Manage school enrollments and student records',
      endpoint: 'https://api.education.gov.ug/v1/schools',
      methods: ['GET', 'POST'],
      getExample: `curl -X GET \\
  https://api.education.gov.ug/v1/schools/SCH001 \\
  -H 'Authorization: Bearer YOUR_API_KEY'`,
      getResponse: `{
  "schoolCode": "SCH001",
  "schoolName": "Kampala High School",
  "district": "Kampala",
  "enrollment": 850,
  "studentGrades": ["S.1", "S.2", "S.3", "S.4", "S.5", "S.6"]
}`,
      postExample: `curl -X POST \\
  https://api.education.gov.ug/v1/schools/SCH001/students \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "studentName": "Alice Nakimuli",
    "admissionNumber": "ALN2024001",
    "grade": "S.1"
  }'`,
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

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">API Documentation</h1>
          <p className="text-muted-foreground mt-1">
            Complete reference for government APIs
          </p>
        </div>

        {/* API Cards */}
        <div className="space-y-6">
          {apis.map((api) => (
            <Card key={api.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">{api.name}</h2>
                    <Badge variant="outline">{api.version}</Badge>
                  </div>
                  <p className="text-muted-foreground">{api.description}</p>
                  <p className="text-sm text-muted-foreground mt-2 font-mono bg-muted p-2 rounded inline-block mt-3">
                    {api.endpoint}
                  </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  {api.methods.map((method) => (
                    <Badge key={method} variant="secondary">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>

              <Tabs defaultValue="get" className="w-full">
                <TabsList>
                  <TabsTrigger value="get">GET Example</TabsTrigger>
                  <TabsTrigger value="post">POST Example</TabsTrigger>
                  <TabsTrigger value="response">Response</TabsTrigger>
                </TabsList>

                <TabsContent value="get" className="space-y-4 mt-4">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs text-muted-foreground">
                      <code>{api.getExample}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(api.getExample, `${api.id}-get`)}
                      className="absolute top-2 right-2 p-2 bg-primary/20 hover:bg-primary/30 rounded transition-colors"
                    >
                      {copiedCode === `${api.id}-get` ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </TabsContent>

                <TabsContent value="post" className="space-y-4 mt-4">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs text-muted-foreground">
                      <code>{api.postExample}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(api.postExample, `${api.id}-post`)}
                      className="absolute top-2 right-2 p-2 bg-primary/20 hover:bg-primary/30 rounded transition-colors"
                    >
                      {copiedCode === `${api.id}-post` ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </TabsContent>

                <TabsContent value="response" className="space-y-4 mt-4">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs text-muted-foreground">
                      <code>{api.getResponse}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(api.getResponse, `${api.id}-response`)}
                      className="absolute top-2 right-2 p-2 bg-primary/20 hover:bg-primary/30 rounded transition-colors"
                    >
                      {copiedCode === `${api.id}-response` ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </TabsContent>
              </Tabs>

              <Button className="mt-6">Try Now</Button>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
