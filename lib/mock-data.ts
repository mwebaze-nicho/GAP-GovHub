export const ministries = [
  { id: 'moh', name: 'Ministry of Health', color: '#38A169' },
  { id: 'moe', name: 'Ministry of Education', color: '#3182CE' },
  { id: 'mof', name: 'Ministry of Finance', color: '#D69E2E' },
  { id: 'moa', name: 'Ministry of Agriculture', color: '#9F7AEA' },
  { id: 'moj', name: 'Ministry of Justice', color: '#E53E3E' },
  { id: 'moict', name: 'Ministry of ICT', color: '#38B2AC' },
]

export const apis = [
  {
    id: 'api-001',
    name: 'Patient Records API',
    ministry: 'Ministry of Health',
    ministryId: 'moh',
    status: 'active',
    endpoint: 'https://api.health.gov.ug/v1/patients',
    callsPerDay: 1234,
    uptime: 99.9,
    responseTime: 125,
    version: 'v1.2.3',
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    description: 'Centralized patient records and medical history access',
    methods: ['GET', 'POST', 'PUT'],
  },
  {
    id: 'api-002',
    name: 'Education Management System API',
    ministry: 'Ministry of Education',
    ministryId: 'moe',
    status: 'active',
    endpoint: 'https://api.education.gov.ug/v1/schools',
    callsPerDay: 890,
    uptime: 99.7,
    responseTime: 98,
    version: 'v2.0.0',
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    description: 'School enrollment, student records, and academic performance',
    methods: ['GET', 'POST'],
  },
  {
    id: 'api-003',
    name: 'Tax Collection API',
    ministry: 'Ministry of Finance',
    ministryId: 'mof',
    status: 'maintenance',
    endpoint: 'https://api.tax.gov.ug/v1/uра',
    callsPerDay: 0,
    uptime: 0,
    responseTime: 0,
    version: 'v1.5.1',
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    description: 'URA tax collection and compliance management system',
    methods: ['GET', 'POST', 'PUT'],
  },
  {
    id: 'api-004',
    name: 'National ID Verification API',
    ministry: 'Ministry of ICT',
    ministryId: 'moict',
    status: 'active',
    endpoint: 'https://api.nic.gov.ug/v1/verify',
    callsPerDay: 3456,
    uptime: 99.95,
    responseTime: 45,
    version: 'v3.1.0',
    lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000),
    description: 'National identification verification and validation service',
    methods: ['GET', 'POST'],
  },
  {
    id: 'api-005',
    name: 'Land Registry API',
    ministry: 'Ministry of Agriculture',
    ministryId: 'moa',
    status: 'active',
    endpoint: 'https://api.land.gov.ug/v1/properties',
    callsPerDay: 567,
    uptime: 99.8,
    responseTime: 156,
    version: 'v1.0.5',
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    description: 'Land ownership and property registration records',
    methods: ['GET', 'POST'],
  },
]

export const generateHourlyMetrics = () => {
  const data = []
  for (let i = 23; i >= 0; i--) {
    const hour = new Date()
    hour.setHours(hour.getHours() - i)
    data.push({
      time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      requests: Math.floor(Math.random() * 2000 + 1000),
      errors: Math.floor(Math.random() * 50 + 10),
    })
  }
  return data
}

export const generateResponseTimeData = () => [
  { endpoint: 'Patient Records', avgTime: 125, minTime: 45, maxTime: 240 },
  { endpoint: 'Education System', avgTime: 98, minTime: 32, maxTime: 189 },
  { endpoint: 'Tax Collection', avgTime: 234, minTime: 120, maxTime: 456 },
  { endpoint: 'ID Verification', avgTime: 45, minTime: 28, maxTime: 78 },
  { endpoint: 'Land Registry', avgTime: 156, minTime: 89, maxTime: 234 },
]

export const generateErrorRateData = () => [
  { name: 'Patient Records', value: 0.2, fill: '#38A169' },
  { name: 'Education System', value: 0.5, fill: '#3182CE' },
  { name: 'Tax Collection', value: 2.1, fill: '#D69E2E' },
  { name: 'ID Verification', value: 0.1, fill: '#38B2AC' },
  { name: 'Land Registry', value: 0.3, fill: '#9F7AEA' },
]

export const generateDataVolumeData = () => {
  const data = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      incoming: Math.floor(Math.random() * 500 + 200),
      outgoing: Math.floor(Math.random() * 400 + 150),
    })
  }
  return data
}

export const activityFeed = [
  {
    id: 1,
    action: 'API Call',
    description: 'Health Ministry patient query',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: 'success',
  },
  {
    id: 2,
    action: 'System Alert',
    description: 'High latency detected on Education API',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    status: 'warning',
  },
  {
    id: 3,
    action: 'API Call',
    description: 'ID verification completed',
    timestamp: new Date(Date.now() - 28 * 60 * 1000),
    status: 'success',
  },
  {
    id: 4,
    action: 'Maintenance',
    description: 'Scheduled maintenance - Tax Collection API',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    status: 'info',
  },
  {
    id: 5,
    action: 'Error',
    description: 'Connection timeout - Land Registry',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'error',
  },
]

export const apiKeys = [
  {
    id: 'key-1',
    name: 'Health Ministry Production',
    key: 'gov_prod_8f7k2n9x3q',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    lastUsed: new Date(Date.now() - 30 * 60 * 1000),
    permissions: ['read', 'write'],
  },
  {
    id: 'key-2',
    name: 'Education Dashboard',
    key: 'gov_dev_5m2p9l1v4w',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
    permissions: ['read'],
  },
  {
    id: 'key-3',
    name: 'Finance Integration',
    key: 'gov_int_3x8j6q2n5p',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    permissions: ['read', 'write'],
  },
]

export const auditLogs = [
  {
    id: 1,
    event: 'API Key Generated',
    user: 'Admin User',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    details: 'New API key created for Health Ministry',
    severity: 'info',
  },
  {
    id: 2,
    event: 'Access Denied',
    user: 'Unknown User',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    details: 'Multiple failed authentication attempts',
    severity: 'critical',
  },
  {
    id: 3,
    event: 'Configuration Changed',
    user: 'System Admin',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    details: 'Rate limiting updated for Education API',
    severity: 'info',
  },
  {
    id: 4,
    event: 'Data Export',
    user: 'Finance Manager',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    details: 'Tax collection reports exported',
    severity: 'info',
  },
]

export const dashboardMetrics = {
  totalApis: 45,
  activeConnections: 32,
  dataTransfers: '2.3M',
  uptime: 99.8,
  todayCalls: 12543,
  weeklyGrowth: 8.3,
}
