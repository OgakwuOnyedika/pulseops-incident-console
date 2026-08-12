import React from 'react';
import { Incident } from '../../types/incident';
import { SeverityBadge, StatusBadge } from '../common/Badge';

interface IncidentRowProps {
  incident: Incident;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onSelectIncident: (incident: Incident) => void;
}

export const IncidentRow: React.FC<IncidentRowProps> = ({
  incident,
  isSelected,
  onToggleSelect,
  onSelectIncident,
}) => {
  return (
    <tr
      data-testid={`incident-row-${incident.id}`}
      style={{
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
        transition: 'background-color 0.15s ease',
      }}
    >
      <td style={{ padding: '12px 16px', width: '40px' }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(incident.id)}
          aria-label={`Select incident ${incident.id}: ${incident.title}`}
          style={{ cursor: 'pointer', width: '16px', height: '16px' }}
        />
      </td>
      <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '0.8125rem', color: '#38bdf8' }}>
        <button
          type="button"
          onClick={() => onSelectIncident(incident)}
          style={{
            background: 'none',
            border: 'none',
            color: '#38bdf8',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            padding: 0,
          }}
        >
          {incident.id}
        </button>
      </td>
      <td style={{ padding: '12px 16px' }}>
        <SeverityBadge severity={incident.severity} />
      </td>
      <td style={{ padding: '12px 16px' }}>
        <StatusBadge status={incident.status} />
      </td>
      <td style={{ padding: '12px 16px' }}>
        <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{incident.title}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{incident.description}</div>
      </td>
      <td style={{ padding: '12px 16px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
        {incident.service}
      </td>
      <td style={{ padding: '12px 16px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
        {incident.assignee}
      </td>
      <td style={{ padding: '12px 16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        {new Date(incident.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </td>
    </tr>
  );
};
