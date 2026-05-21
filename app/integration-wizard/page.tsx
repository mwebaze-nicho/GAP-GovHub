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
import { CheckCircle, ArrowRight, Wand2, AlertCircle } from 'lucide-react'
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

  const canProceedFromStep = (step: number) => {
    switch (step) {
      case 1: return formData.ministry !== ''
      case 2: return formData.systemType !== '' && formData.baseUrl !== '' && formData.apiKey !== ''
      case 3: return true // Data mapping is pre-configured
      case 4: return true // Validation is automatic
      default: return false
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length && canProceedFromStep(currentStep)) {
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
                    <div className="flex items-center gap-3">
                      {currentStep > step.number ? (
                        <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      ) : currentStep === step.number ? (
                        <div className="h-6 w-6 rounded-full bg-[#FFD700] flex items-center justify-center">
                          <div className="text-xs font-bold text-black">{step.number}</div>
                        </div>
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-current flex items-center justify-center opacity-60">
                          <div className="text-xs font-bold">{step.number}</div>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          currentStep === step.number ? 'text-[#FFD700]' :
                          currentStep > step.number ? 'text-green-600' : ''
                        }`}>{step.title}</p>
                        <p className="text-xs opacity-70">{step.description}</p>
                        {currentStep > step.number && (
                          <p className="text-xs text-green-600 font-medium mt-1">✓ Completed</p>
                        )}
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
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">
                      Select Your Ministry
                    </h2>
                    <p className="text-muted-foreground">
                      Choose the ministry or government department you represent
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ministries.map((ministry) => (
                      <button
                        key={ministry.id}
                        onClick={() => handleInputChange('ministry', ministry.name)}
                        className={`p-6 border-2 rounded-xl transition-all group ${
                          formData.ministry === ministry.name
                            ? 'border-[#FFD700] bg-[#FFD700]/10 shadow-lg shadow-[#FFD700]/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-[#FFD700]/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 transition-all ${
                              formData.ministry === ministry.name
                                ? 'border-[#FFD700] bg-[#FFD700]'
                                : 'border-slate-300 dark:border-slate-600 group-hover:border-[#FFD700]/60'
                            }`}
                          >
                            {formData.ministry === ministry.name && (
                              <div className="w-full h-full rounded-full bg-[#FFD700] flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              </div>
                            )}
                          </div>
                          <p className={`font-medium text-left transition-colors ${
                            formData.ministry === ministry.name
                              ? 'text-slate-900 dark:text-slate-100'
                              : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100'
                          }`}>
                            {ministry.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                  {formData.ministry && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-900 dark:text-green-100">
                        {formData.ministry} selected. You can proceed to the next step.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: API Config */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">
                      Configure API Endpoint
                    </h2>
                    <p className="text-muted-foreground">
                      Provide details about your system's API endpoint and authentication
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="systemType" className="text-sm font-medium">System Type *</Label>
                      <Select value={formData.systemType} onValueChange={(v) => handleInputChange('systemType', v)}>
                        <SelectTrigger className={formData.systemType ? 'border-green-500' : ''}>
                          <SelectValue placeholder="Select your API type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rest">REST API</SelectItem>
                          <SelectItem value="soap">SOAP Web Service</SelectItem>
                          <SelectItem value="graphql">GraphQL API</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.systemType && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> System type selected
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="baseUrl" className="text-sm font-medium">Base URL *</Label>
                      <Input
                        id="baseUrl"
                        placeholder="https://api.health.gov.ug"
                        value={formData.baseUrl}
                        onChange={(e) => handleInputChange('baseUrl', e.target.value)}
                        className={formData.baseUrl ? 'border-green-500' : ''}
                      />
                      <p className="text-xs text-muted-foreground">
                        The base URL of your API endpoint (e.g., https://api.health.gov.ug)
                      </p>
                      {formData.baseUrl && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Base URL configured
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="authType" className="text-sm font-medium">Authentication Type</Label>
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

                    <div className="space-y-2">
                      <Label htmlFor="apiKey" className="text-sm font-medium">API Key *</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        placeholder="Enter your API key"
                        value={formData.apiKey}
                        onChange={(e) => handleInputChange('apiKey', e.target.value)}
                        className={formData.apiKey ? 'border-green-500' : ''}
                      />
                      <p className="text-xs text-muted-foreground">
                        Your API authentication key (will be encrypted and stored securely)
                      </p>
                      {formData.apiKey && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> API key provided
                        </p>
                      )}
                    </div>
                  </div>

                  {!canProceedFromStep(2) && (
                    <div className="flex items-center gap-2 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                        Please fill all required fields (*) to proceed to the next step.
                      </span>
                    </div>
                  )}
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
                  disabled={currentStep === steps.length || !canProceedFromStep(currentStep)}
                  className={`flex-1 ${
                    !canProceedFromStep(currentStep) && currentStep !== steps.length
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {currentStep === steps.length ? 'Complete' : 'Next'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
