'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight, Wand2 } from 'lucide-react'
import { ministries } from '@/lib/mock-data'

const steps = [
  { number: 1, title: 'Ministry Info', description: 'Select your ministry' },
  { number: 2, title: 'API Config', description: 'Configure API endpoint' },
  { number: 3, title: 'Data Mapping', description: 'Map data fields' },
  { number: 4, title: 'Validation', description: 'Test connection' },
  { number: 5, title: 'Go Live', description: 'Deploy integration' },
]

export default function IntegrationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    ministry: '',
    systemType: '',
    contactName: '',
    contactEmail: '',
    baseUrl: '',
    authType: 'api-key',
    apiKey: '',
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <MainLayout>
      <BreadcrumbNav />

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            System Integration Wizard
          </h1>
          <p className="text-muted-foreground mt-1">
            Connect your government system to the GovHub platform
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Steps */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Steps</h3>
              <div className="space-y-3">
                {steps.map((step) => (
                  <button
                    key={step.number}
                    onClick={() => setCurrentStep(step.number)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentStep === step.number
                        ? 'bg-primary text-primary-foreground'
                        : currentStep > step.number
                          ? 'bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-100'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {currentStep > step.number ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-current flex items-center justify-center text-xs font-bold">
                          {step.number}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{step.title}</p>
                        <p className="text-xs opacity-70">{step.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              {/* Step 1: Ministry Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Select Your Ministry
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ministries.map((ministry) => (
                      <button
                        key={ministry.id}
                        onClick={() => handleInputChange('ministry', ministry.id)}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          formData.ministry === ministry.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <p className="font-medium text-foreground text-left">
                          {ministry.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: API Config */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Configure API Endpoint
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label>System Type</Label>
                      <Select value={formData.systemType} onValueChange={(v) => handleInputChange('systemType', v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select system type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rest">REST API</SelectItem>
                          <SelectItem value="soap">SOAP Web Service</SelectItem>
                          <SelectItem value="graphql">GraphQL API</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Base URL</Label>
                      <Input
                        placeholder="https://api.example.gov.ug"
                        value={formData.baseUrl}
                        onChange={(e) => handleInputChange('baseUrl', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Authentication Type</Label>
                      <Select value={formData.authType} onValueChange={(v) => handleInputChange('authType', v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="api-key">API Key</SelectItem>
                          <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                          <SelectItem value="basic">Basic Auth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>API Key</Label>
                      <Input
                        type="password"
                        placeholder="Enter your API key"
                        value={formData.apiKey}
                        onChange={(e) => handleInputChange('apiKey', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Data Mapping */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Map Your Data Fields
                  </h2>
                  <div className="bg-muted p-6 rounded-lg">
                    <p className="text-foreground font-medium mb-4">
                      Source → Target Field Mapping
                    </p>
                    <div className="space-y-3">
                      {[
                        { source: 'PatientID', target: 'national_id' },
                        { source: 'FullName', target: 'name' },
                        { source: 'DOB', target: 'birth_date' },
                      ].map((field, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <Input
                            disabled
                            value={field.source}
                            className="bg-background"
                          />
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <Input
                            disabled
                            value={field.target}
                            className="bg-background"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Validation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Validate Connection
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">
                          API Connection Successful
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Successfully connected to {formData.baseUrl}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">
                          Authentication Verified
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          API key is valid and active
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">
                          Data Mapping Valid
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          All field mappings are correctly configured
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Go Live */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Ready to Go Live
                  </h2>
                  <Card className="bg-primary/5 border-primary p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      Integration Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Ministry:</span> {formData.ministry}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">API Endpoint:</span> {formData.baseUrl}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">System Type:</span> {formData.systemType}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Status:</span> <Badge>Ready</Badge>
                      </p>
                    </div>
                  </Card>
                  <Button className="w-full">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Deploy Integration
                  </Button>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-8 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentStep === steps.length}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
