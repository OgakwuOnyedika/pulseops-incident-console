import React from 'react';
import { IncidentSeverity, IncidentStatus } from '../../types/incident';
import { AlertCircleIcon, CheckCircleIcon, ClockIcon } from './Icons';

interface SeverityBadgeProps {
  severity: IncidentSeverity;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const config = {
    critical: { label: 'Critical', bg: 'var(--color-critical-bg)', color: 'var(--color-critical)', icon: <AlertCircleIcon size={12} /> },
    high: { label: 'High', bg: 'var(--color-high-bg)', color: 'var(--color-high)', icon: <AlertCircleIcon size={12} /> },
    medium: { label: 'Medium', bg: 'var(--color-medium-bg)', color: 'var(--color-medium)', icon: <ClockIcon size={12} /> },
    low: { label: 'Low', bg: 'var(--color-low-bg)', color: 'var(--color-low)', icon: <CheckCircleIcon size={12} /> },
  }[severity];

  return (
    <span
      role="status"
      aria-label={`Severity: ${config.label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.color}33`,
      }}
    >
      <span aria-hidden="true">{config.icon}</span>
      {config.label}
    </span>
  );
};

interface StatusBadgeProps {
  status: IncidentStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    open: { label: 'Open', bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', icon: <AlertCircleIcon size={12} /> },
    investigating: { label: 'Investigating', bg: 'rgba(234, 179, 8, 0.1)', color: '#eab308', icon: <ClockIcon size={12} /> },
    mitigated: { label: 'Mitigated', bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', icon: <CheckCircleIcon size={12} /> },
    resolved: { label: 'Resolved', bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', icon: <CheckCircleIcon size={12} /> },
  }[status];

  return (
    <span
      role="status"
      aria-label={`Status: ${config.label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 500,
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.color}40`,
      }}
    >
      <span aria-hidden="true">{config.icon}</span>
      {config.label}
    </span>
  );
};
