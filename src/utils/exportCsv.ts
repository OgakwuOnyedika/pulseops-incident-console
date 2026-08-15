import { Incident } from '../types/incident';

export function exportIncidentsToCsv(incidents: Incident[]): string {
  const headers = ['ID', 'Title', 'Service', 'Severity', 'Status', 'Assignee', 'Created At'];
  const rows = incidents.map((inc) => [
    inc.id,
    `"${inc.title.replace(/"/g, '""')}"`,
    inc.service,
    inc.severity,
    inc.status,
    inc.assignee,
    inc.createdAt,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
