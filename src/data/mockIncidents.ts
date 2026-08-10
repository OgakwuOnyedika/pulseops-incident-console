import { Incident } from '../types/incident';

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-101',
    title: 'High latency on authentication endpoint /v2/token',
    service: 'auth-service',
    severity: 'critical',
    status: 'investigating',
    assignee: 'Sarah Connor',
    createdAt: '2026-08-18T01:15:00Z',
    updatedAt: '2026-08-18T02:00:00Z',
    description: 'P99 response time degraded from 45ms to 2400ms following Redis cluster cache eviction.',
    tags: ['auth', 'latency', 'p0'],
    auditLog: [
      { id: 'aud-1', timestamp: '2026-08-18T01:15:00Z', author: 'Monitoring Bot', action: 'Created incident' },
      { id: 'aud-2', timestamp: '2026-08-18T01:20:00Z', author: 'Sarah Connor', action: 'Acknowledged and paged DB team' }
    ]
  },
  {
    id: 'INC-102',
    title: 'Payment gateway webhook delivery failure',
    service: 'billing-engine',
    severity: 'critical',
    status: 'open',
    assignee: 'Unassigned',
    createdAt: '2026-08-18T01:45:00Z',
    updatedAt: '2026-08-18T01:45:00Z',
    description: 'Outgoing webhook worker pool exhausted due to TLS handshake timeout on Stripe endpoint.',
    tags: ['payments', 'webhooks', 'stripe'],
    auditLog: [
      { id: 'aud-3', timestamp: '2026-08-18T01:45:00Z', author: 'System Alert', action: 'Created incident' }
    ]
  },
  {
    id: 'INC-103',
    title: 'Ingress router 502 Bad Gateway spike in us-east-1',
    service: 'ingress-gateway',
    severity: 'high',
    status: 'mitigated',
    assignee: 'Alex Chen',
    createdAt: '2026-08-18T00:30:00Z',
    updatedAt: '2026-08-18T02:10:00Z',
    description: 'Upstream pod autoscaler failed to scale out during traffic burst; mitigated via manual replica override.',
    tags: ['network', 'ingress', 'kubernetes'],
    auditLog: [
      { id: 'aud-4', timestamp: '2026-08-18T00:30:00Z', author: 'Alex Chen', action: 'Scaled deployment to 24 replicas' }
    ]
  },
  {
    id: 'INC-104',
    title: 'Notification worker dead letter queue accumulation',
    service: 'notify-worker',
    severity: 'medium',
    status: 'open',
    assignee: 'Devon Miles',
    createdAt: '2026-08-17T22:10:00Z',
    updatedAt: '2026-08-18T00:15:00Z',
    description: 'Malformed email payload format from legacy webhook causing message parsing rejections.',
    tags: ['notifications', 'sqs'],
    auditLog: [
      { id: 'aud-5', timestamp: '2026-08-17T22:10:00Z', author: 'Devon Miles', action: 'Investigating DLQ parser' }
    ]
  },
  {
    id: 'INC-105',
    title: 'Search indexing pipeline lag exceeded 15 minutes',
    service: 'search-indexer',
    severity: 'medium',
    status: 'investigating',
    assignee: 'Elena Rostova',
    createdAt: '2026-08-17T21:00:00Z',
    updatedAt: '2026-08-18T01:30:00Z',
    description: 'Elasticsearch document indexing throughput throttled due to primary shard saturation.',
    tags: ['search', 'elasticsearch'],
    auditLog: [
      { id: 'aud-6', timestamp: '2026-08-17T21:00:00Z', author: 'Elena Rostova', action: 'Increased index buffer size' }
    ]
  },
  {
    id: 'INC-106',
    title: 'Customer analytics export CSV formatting bug',
    service: 'analytics-api',
    severity: 'low',
    status: 'resolved',
    assignee: 'Marcus Vance',
    createdAt: '2026-08-17T18:00:00Z',
    updatedAt: '2026-08-18T02:40:00Z',
    description: 'Dates formatted in local server timezone instead of UTC in exported spreadsheets.',
    tags: ['reporting', 'analytics'],
    auditLog: [
      { id: 'aud-7', timestamp: '2026-08-17T18:00:00Z', author: 'Marcus Vance', action: 'Fixed ISO string conversion' }
    ]
  },
  {
    id: 'INC-107',
    title: 'GraphQL schema federation query plan recursion',
    service: 'graphql-gateway',
    severity: 'high',
    status: 'open',
    assignee: 'Unassigned',
    createdAt: '2026-08-18T02:00:00Z',
    updatedAt: '2026-08-18T02:00:00Z',
    description: 'Nested entity resolvers causing exponential query planning time on deep queries.',
    tags: ['graphql', 'api'],
    auditLog: [
      { id: 'aud-8', timestamp: '2026-08-18T02:00:00Z', author: 'System Alert', action: 'Created incident' }
    ]
  },
  {
    id: 'INC-108',
    title: 'TLS certificate expiration warning for staging wildcard domain',
    service: 'cert-manager',
    severity: 'low',
    status: 'open',
    assignee: 'Devon Miles',
    createdAt: '2026-08-17T14:20:00Z',
    updatedAt: '2026-08-17T14:20:00Z',
    description: 'Staging cert expiring in 7 days; automated renewal failed due to DNS challenge timeout.',
    tags: ['security', 'tls', 'infra'],
    auditLog: [
      { id: 'aud-9', timestamp: '2026-08-17T14:20:00Z', author: 'Cert Bot', action: 'Warning triggered' }
    ]
  }
];
