import React from 'react';
import { FilterState, IncidentSeverity, IncidentStatus } from '../../types/incident';

interface QueueFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableServices: string[];
}

export const QueueFilters: React.FC<QueueFiltersProps> = ({
  filters,
  onFilterChange,
  availableServices,
}) => {
  const severities: IncidentSeverity[] = ['critical', 'high', 'medium', 'low'];
  const statuses: IncidentStatus[] = ['open', 'investigating', 'mitigated', 'resolved'];

  const toggleSeverity = (sev: IncidentSeverity) => {
    const updated = filters.severities.includes(sev)
      ? filters.severities.filter((s) => s !== sev)
      : [...filters.severities, sev];
    onFilterChange({ ...filters, severities: updated });
  };

  const toggleStatus = (st: IncidentStatus) => {
    const updated = filters.statuses.includes(st)
      ? filters.statuses.filter((s) => s !== st)
      : [...filters.statuses, st];
    onFilterChange({ ...filters, statuses: updated });
  };

  return (
    <aside
      aria-label="Queue Filter Controls"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '16px',
        width: '240px',
        flexShrink: 0,
      }}
    >
      <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
        Filter Queue
      </h3>

      <fieldset style={{ border: 'none', padding: 0, marginBottom: '16px' }}>
        <legend style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Severity
        </legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {severities.map((sev) => (
            <label key={sev} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.severities.includes(sev)}
                onChange={() => toggleSeverity(sev)}
                aria-label={`Filter severity ${sev}`}
              />
              <span style={{ textTransform: 'capitalize' }}>{sev}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset style={{ border: 'none', padding: 0, marginBottom: '16px' }}>
        <legend style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Status
        </legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {statuses.map((st) => (
            <label key={st} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.statuses.includes(st)}
                onChange={() => toggleStatus(st)}
                aria-label={`Filter status ${st}`}
              />
              <span style={{ textTransform: 'capitalize' }}>{st}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="service-select" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
          Service Domain
        </label>
        <select
          id="service-select"
          value={filters.service}
          onChange={(e) => onFilterChange({ ...filters, service: e.target.value })}
          style={{
            width: '100%',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            padding: '6px 8px',
            fontSize: '0.8125rem',
          }}
        >
          <option value="">All Services</option>
          {availableServices.map((svc) => (
            <option key={svc} value={svc}>
              {svc}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filters.unassignedOnly}
            onChange={(e) => onFilterChange({ ...filters, unassignedOnly: e.target.checked })}
          />
          <span>Unassigned Only</span>
        </label>
      </div>
    </aside>
  );
};
