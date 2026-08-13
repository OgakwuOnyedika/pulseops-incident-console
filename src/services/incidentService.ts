import { INITIAL_INCIDENTS } from '../data/mockIncidents';
import { FilterState, Incident, SortConfig } from '../types/incident';

export async function fetchIncidentsAsync(
  filters: FilterState,
  sort: SortConfig,
  signal?: AbortSignal,
  customLatencyMs = 80
): Promise<Incident[]> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(new DOMException('Aborted', 'AbortError'));
        return;
      }

      let results = [...INITIAL_INCIDENTS];

      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        results = results.filter(
          (inc) =>
            inc.title.toLowerCase().includes(q) ||
            inc.description.toLowerCase().includes(q) ||
            inc.service.toLowerCase().includes(q) ||
            inc.id.toLowerCase().includes(q)
        );
      }

      if (filters.severities.length > 0) {
        results = results.filter((inc) => filters.severities.includes(inc.severity));
      }

      if (filters.statuses.length > 0) {
        results = results.filter((inc) => filters.statuses.includes(inc.status));
      }

      if (filters.service) {
        results = results.filter((inc) => inc.service === filters.service);
      }

      if (filters.unassignedOnly) {
        results = results.filter((inc) => inc.assignee === 'Unassigned');
      }

      results.sort((a, b) => {
        let valA: string = a[sort.field] as string;
        let valB: string = b[sort.field] as string;

        if (sort.field === 'createdAt') {
          return sort.direction === 'asc'
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }

        const comp = valA.localeCompare(valB);
        return sort.direction === 'asc' ? comp : -comp;
      });

      resolve(results);
    }, customLatencyMs);

    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(new DOMException('Aborted', 'AbortError'));
      });
    }
  });
}
