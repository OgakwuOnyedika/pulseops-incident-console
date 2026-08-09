export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'open' | 'investigating' | 'mitigated' | 'resolved';

export interface AuditEntry {
  id: string;
  timestamp: string;
  author: string;
  action: string;
  detail?: string;
}

export interface Incident {
  id: string;
  title: string;
  service: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  tags: string[];
  auditLog: AuditEntry[];
}

export interface FilterState {
  searchQuery: string;
  severities: IncidentSeverity[];
  statuses: IncidentStatus[];
  service: string;
  unassignedOnly: boolean;
}

export type SortField = 'createdAt' | 'severity' | 'title' | 'status' | 'service';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface PaginationState {
  page: number;
  pageSize: number;
}
