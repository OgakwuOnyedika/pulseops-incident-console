import React from 'react';
import { Incident, IncidentStatus } from '../types/incident';
import { SeverityBadge, StatusBadge } from '../components/common/Badge';
import { CloseIcon } from '../components/common/Icons';

interface IncidentDetailDrawerProps {
  incident: Incident | null;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: IncidentStatus) => void;
}

export const IncidentDetailDrawer: React.FC<IncidentDetailDrawerProps> = ({
  incident,
  onClose,
  onStatusChange,
}) => {
  if (!incident) return null;

  return (
    <aside
      role="complementary"
      aria-label={`Incident details for ${incident.id}`}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '420px',
        backgroundColor: 'var(--bg-surface)',
        borderLeft: '1px solid var(--border-color)',
        boxShadow: '-10px 0 25px rgba(0, 0, 0, 0.5)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div>
          <span style={{ fontSize: '0.8125rem', fontFamily: 'monospace', color: '#38bdf8' }}>
            {incident.id}
          </span>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '4px 0 0' }}>
            {incident.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details drawer"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <CloseIcon size={18} />
        </button>
      </div>

      <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <SeverityBadge severity={incident.severity} />
          <StatusBadge status={incident.status} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Summary
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{incident.description}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Metadata
          </h3>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div><strong>Service:</strong> {incident.service}</div>
            <div><strong>Assignee:</strong> {incident.assignee}</div>
            <div><strong>Created:</strong> {new Date(incident.createdAt).toLocaleString()}</div>
            <div><strong>Updated:</strong> {new Date(incident.updatedAt).toLocaleString()}</div>
          </div>
        </div>

        <div>
          <label htmlFor="drawer-status-select" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Update Status
          </label>
          <select
            id="drawer-status-select"
            value={incident.status}
            onChange={(e) => onStatusChange(incident.id, e.target.value as IncidentStatus)}
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: '4px',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="mitigated">Mitigated</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>
    </aside>
  );
};
