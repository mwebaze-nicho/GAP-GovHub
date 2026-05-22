'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, Copy, CheckCircle, Trash2, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { OverflowIndicator } from '@/components/ui/overflow-indicator'

export default function DataTransformation() {
  const router = useRouter()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [actionFeedback, setActionFeedback] = useState<{[key: number]: string}>({})
  const [testingTransform, setTestingTransform] = useState<number | null>(null)
  const [transformations, setTransformations] = useState<any[]>([])

  // Load transformations from localStorage on component mount
  useEffect(() => {
    const defaultTransformations = [
      {
        id: 1,
        name: 'Patient Record Normalization',
        source: 'Health Ministry API',
        sourceUrl: 'https://api.health.gov.ug/v1',
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
        sourceUrl: 'https://api.education.gov.ug/v1',
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
        sourceUrl: 'https://api.ura.gov.ug/v2',
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

    const loadTransformations = () => {
      const stored = localStorage.getItem('govhub-transformations')
      let customTransformations: any[] = []

      if (stored) {
        try {
          customTransformations = JSON.parse(stored)
        } catch (error) {
          console.error('Error loading transformations:', error)
        }
      }

      // Always set the complete list: custom transformations first, then defaults
      setTransformations([...customTransformations, ...defaultTransformations])
    }

    loadTransformations()

    // Listen for storage changes to sync across tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'govhub-transformations') {
        loadTransformations()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleEditTransform = (transformId: number, transformName: string) => {
    // In a real app, this would open an edit modal or navigate to edit page
    setActionFeedback(prev => ({...prev, [transformId]: `Opening editor...`}))
    setTimeout(() => {
      setActionFeedback(prev => ({...prev, [transformId]: `Redirecting to editor...`}))
      setTimeout(() => {
        router.push('/integration-wizard?step=3')
        setActionFeedback(prev => {
          const newState = {...prev}
          delete newState[transformId]
          return newState
        })
      }, 1500)
    }, 1000)
  }

  const handleTestTransform = async (transformId: number, transformName: string) => {
    setTestingTransform(transformId)
    setActionFeedback(prev => ({...prev, [transformId]: `Testing transformation...`}))

    // Simulate API testing with realistic delay
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2 // 80% success rate
      if (isSuccess) {
        setActionFeedback(prev => ({...prev, [transformId]: `✅ Test passed! Working correctly.`}))
      } else {
        setActionFeedback(prev => ({...prev, [transformId]: `❌ Test failed! Field mapping errors.`}))
      }
      setTestingTransform(null)
      setTimeout(() => {
        setActionFeedback(prev => {
          const newState = {...prev}
          delete newState[transformId]
          return newState
        })
      }, 4000)
    }, 2500)
  }

  const handleDeployTransform = (transformId: number, transformName: string) => {
    setActionFeedback(prev => ({...prev, [transformId]: `Deploying to production...`}))

    // Simulate deployment process
    setTimeout(() => {
      setActionFeedback(prev => ({...prev, [transformId]: `🚀 Successfully deployed! Changes are live.`}))
      setTimeout(() => {
        setActionFeedback(prev => {
          const newState = {...prev}
          delete newState[transformId]
          return newState
        })
      }, 3000)
    }, 2000)
  }

  const deleteCorrespondingApi = (transformationToDelete: any) => {
    // Only delete APIs for custom transformations (created via Integration Wizard)
    if (transformationToDelete.id <= 1000 || !transformationToDelete.sourceUrl) {
      return
    }

    try {
      // Get existing registered APIs from localStorage
      const existingApis = localStorage.getItem('govhub-registered-apis')
      if (!existingApis) return

      const registeredApis = JSON.parse(existingApis)

      // Find matching API by endpoint URL
      const matchingApiIndex = registeredApis.findIndex((api: any) =>
        api.endpoint === transformationToDelete.sourceUrl
      )

      if (matchingApiIndex !== -1) {
        // Remove the matching API
        const updatedApis = registeredApis.filter((_: any, index: number) => index !== matchingApiIndex)

        // Save updated APIs back to localStorage
        localStorage.setItem('govhub-registered-apis', JSON.stringify(updatedApis))

        console.log(`Deleted corresponding API with endpoint: ${transformationToDelete.sourceUrl}`)
      } else {
        console.log(`No matching API found for endpoint: ${transformationToDelete.sourceUrl}`)
      }
    } catch (error) {
      console.error('Error deleting corresponding API:', error)
    }
  }

  const handleDeleteTransform = (transformId: number, transformName: string) => {
    if (window.confirm(`Are you sure you want to delete "${transformName}"?\n\nThis will also remove the corresponding API from the API Registry.\n\nThis action cannot be undone.`)) {
      setActionFeedback(prev => ({...prev, [transformId]: `Deleting transformation and API...`}))

      // Find the transformation to delete to get its details
      const transformationToDelete = transformations.find(t => t.id === transformId)

      // Update local state
      setTransformations(prev => prev.filter(t => t.id !== transformId))

      // Update localStorage (only for custom transformations with high IDs)
      if (transformId > 1000) { // Custom transformations have timestamp IDs
        const existingTransformations = localStorage.getItem('govhub-transformations')
        if (existingTransformations) {
          try {
            const transformations = JSON.parse(existingTransformations)
            const updatedTransformations = transformations.filter((t: any) => t.id !== transformId)
            localStorage.setItem('govhub-transformations', JSON.stringify(updatedTransformations))
          } catch (error) {
            console.error('Error updating localStorage:', error)
          }
        }

        // Delete the corresponding API from the registry
        if (transformationToDelete) {
          deleteCorrespondingApi(transformationToDelete)
        }
      }

      setTimeout(() => {
        setActionFeedback(prev => {
          const newState = {...prev}
          delete newState[transformId]
          return newState
        })
      }, 1500) // Increased timeout slightly for the longer operation
    }
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
          <Button
            onClick={() => router.push('/integration-wizard?step=3')}
            className="w-full sm:w-auto bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-medium"
          >
            <Zap className="h-4 w-4 mr-2" />
            Create Transformation
          </Button>
        </div>


        {/* Transformations Grid */}
        <div className="grid gap-4 sm:gap-6">
          {transformations.map((transform) => (
            <Card key={transform.id} className="p-4 sm:p-6 relative">
              {/* Card-specific Action Feedback */}
              {actionFeedback[transform.id] && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg max-w-xs">
                    <p className="text-xs text-foreground font-medium">{actionFeedback[transform.id]}</p>
                  </div>
                </div>
              )}
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
                      {(transform as any).sourceUrl && (
                        <div className="flex items-center gap-1 mt-2">
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                          <a
                            href={(transform as any).sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                          >
                            {(transform as any).sourceUrl}
                          </a>
                        </div>
                      )}
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:border-blue-700 dark:hover:text-blue-300"
                        onClick={() => handleEditTransform(transform.id, transform.name)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs hover:bg-green-50 hover:border-green-300 hover:text-green-700 dark:hover:bg-green-950 dark:hover:border-green-700 dark:hover:text-green-300"
                        onClick={() => handleTestTransform(transform.id, transform.name)}
                        disabled={testingTransform === transform.id}
                      >
                        {testingTransform === transform.id ? 'Testing...' : 'Test'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs hover:bg-[#FFD700]/20 hover:border-[#FFD700] hover:text-[#FFD700] dark:hover:bg-[#FFD700]/10"
                        onClick={() => handleDeployTransform(transform.id, transform.name)}
                      >
                        Deploy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs hover:bg-red-50 hover:border-red-300 hover:text-red-700 dark:hover:bg-red-950 dark:hover:border-red-700 dark:hover:text-red-300"
                        onClick={() => handleDeleteTransform(transform.id, transform.name)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Code */}
                <div className="relative">
                  <OverflowIndicator
                    direction="horizontal"
                    className="border border-slate-200/60 dark:border-slate-700/60 rounded-lg shadow-sm shadow-slate-200/10 dark:shadow-slate-900/10 ring-1 ring-slate-200/10 dark:ring-slate-700/10 h-48"
                  >
                    <pre className="bg-muted p-3 sm:p-4 pr-12 sm:pr-14 text-xs font-mono text-muted-foreground whitespace-pre">
                      <code>{transform.code}</code>
                    </pre>
                  </OverflowIndicator>
                  <button
                    onClick={() => copyToClipboard(transform.code, transform.id.toString())}
                    className="absolute top-2 right-2 p-1.5 sm:p-2 bg-primary/20 hover:bg-primary/30 rounded transition-colors z-20"
                  >
                    {copiedCode === transform.id.toString() ? (
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
