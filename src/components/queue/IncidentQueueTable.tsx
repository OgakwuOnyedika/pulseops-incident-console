import React, { useEffect, useMemo, useState } from 'react';
import { fetchIncidentsAsync } from '../../services/incidentService';
import { FilterState, Incident, PaginationState, SortConfig, SortField } from '../../types/incident';
import { SearchInput } from '../common/SearchInput';
import { BulkActionBar } from './BulkActionBar';
import { ColumnHeader } from './ColumnHeader';
import { IncidentRow } from './IncidentRow';
import { Pagination } from './Pagination';
import { QueueFilters } from './QueueFilters';

interface IncidentQueueTableProps {
  onSelectIncident: (incident: Incident) => void;
}

export const IncidentQueueTable: React.FC<IncidentQueueTableProps> = ({ onSelectIncident }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    severities: [],
    statuses: [],
    service: '',
    unassignedOnly: false,
  });

  const [sort, setSort] = useState<SortConfig>({
    field: 'createdAt',
    direction: 'desc',
  });

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 5,
  });

  useEffect(() => {
    setIsLoading(true);
    setSelectedIds([]);

    fetchIncidentsAsync(filters, sort).then((data) => {
      setIncidents(data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, [filters, sort]);

  const availableServices = useMemo(() => {
    const services = new Set<string>();
    incidents.forEach((i) => services.add(i.service));
    return Array.from(services);
  }, [incidents]);

  const totalPages = Math.ceil(incidents.length / pagination.pageSize);
  const paginatedIncidents = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return incidents.slice(start, start + pagination.pageSize);
  }, [incidents, pagination]);

  const handleSort = (field: SortField) => {
    setSort((prev) => {
      if (prev.field === field) {
        return { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { field, direction: 'asc' };
    });
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllCurrentPage = () => {
    const currentPageIds = paginatedIncidents.map((i) => i.id);
    const allSelected = currentPageIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    }
  };

  const handleBulkResolve = () => {
    setIncidents((prev) =>
      prev.map((inc) => (selectedIds.includes(inc.id) ? { ...inc, status: 'resolved' } : inc))
    );
    setSelectedIds([]);
  };

  const handleBulkAssign = (assignee: string) => {
    setIncidents((prev) =>
      prev.map((inc) => (selectedIds.includes(inc.id) ? { ...inc, assignee } : inc))
    );
  };

  const isAllCurrentPageSelected =
    paginatedIncidents.length > 0 &&
    paginatedIncidents.every((inc) => selectedIds.includes(inc.id));

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <QueueFilters
        filters={filters}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setPagination((p) => ({ ...p, page: 1 }));
        }}
        availableServices={availableServices}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ flex: 1 }}>
            <SearchInput
              value={filters.searchQuery}
              onChange={(searchQuery) => {
                setFilters((f) => ({ ...f, searchQuery }));
                setPagination((p) => ({ ...p, page: 1 }));
              }}
            />
          </div>
        </div>

        <BulkActionBar
          selectedCount={selectedIds.length}
          onClearSelection={() => setSelectedIds([])}
          onBulkResolve={handleBulkResolve}
          onBulkAssign={handleBulkAssign}
        />

        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-elevated)' }}>
                <th style={{ padding: '10px 16px', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={isAllCurrentPageSelected}
                    onChange={handleSelectAllCurrentPage}
                    aria-label="Select all incidents on current page"
                    style={{ cursor: 'pointer' }}
                  />
                </th>
                <th style={{ padding: '10px 16px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  ID
                </th>
                <ColumnHeader label="Severity" field="severity" currentSort={sort} onSort={handleSort} />
                <ColumnHeader label="Status" field="status" currentSort={sort} onSort={handleSort} />
                <ColumnHeader label="Title & Summary" field="title" currentSort={sort} onSort={handleSort} />
                <ColumnHeader label="Service" field="service" currentSort={sort} onSort={handleSort} />
                <th style={{ padding: '10px 16px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Assignee
                </th>
                <ColumnHeader label="Created" field="createdAt" currentSort={sort} onSort={handleSort} />
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    Loading queue...
                  </td>
                </tr>
              ) : paginatedIncidents.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No incidents match the active filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedIncidents.map((incident) => (
                  <IncidentRow
                    key={incident.id}
                    incident={incident}
                    isSelected={selectedIds.includes(incident.id)}
                    onToggleSelect={handleToggleSelect}
                    onSelectIncident={onSelectIncident}
                  />
                ))
              )}
            </tbody>
          </table>

          <Pagination
            currentPage={pagination.page}
            totalPages={totalPages}
            pageSize={pagination.pageSize}
            totalItems={incidents.length}
            onPageChange={(page) => setPagination((p) => ({ ...p, page }))}
            onPageSizeChange={(pageSize) => setPagination({ page: 1, pageSize })}
          />
        </div>
      </div>
    </div>
  );
};
