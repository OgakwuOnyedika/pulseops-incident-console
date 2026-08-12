import React from 'react';
import { Incident } from '../../types/incident';

interface SeverityBreakdownProps {
  incidents: Incident[];
}

export const SeverityBreakdown: React.FC<SeverityBreakdownProps> = ({ incidents }) => {
  const total = incidents.length;

  const counts = incidents.reduce(
    (acc, inc) => {
      acc[inc.severity] = (acc[inc.severity] || 0) + 1;
      return acc;
    },
    { critical: 0, high: 0, medium: 0, low: 0 } as Record<string, number>
  );

  const getPercentage = (count: number) => (total > 0 ? ((count / total) * 100).toFixed(0) : '0');

  return (
    <div
      role="region"
      aria-label="Severity Distribution"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '16px 20px',
        marginTop: '16px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Active Severity Breakdown
        </span>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{total} Total Incidents</span>
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={100}
        aria-label="Severity proportion bar"
        style={{
          display: 'flex',
          height: '8px',
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-primary)',
          margin: '8px 0 12px',
        }}
      >
        {counts.critical > 0 && (
          <div style={{ width: `${getPercentage(counts.critical)}%`, backgroundColor: 'var(--color-critical)' }} />
        )}
        {counts.high > 0 && (
          <div style={{ width: `${getPercentage(counts.high)}%`, backgroundColor: 'var(--color-high)' }} />
        )}
        {counts.medium > 0 && (
          <div style={{ width: `${getPercentage(counts.medium)}%`, backgroundColor: 'var(--color-medium)' }} />
        )}
        {counts.low > 0 && (
          <div style={{ width: `${getPercentage(counts.low)}%`, backgroundColor: 'var(--color-low)' }} />
        )}
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-critical)' }} />
          Critical: {counts.critical} ({getPercentage(counts.critical)}%)
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-high)' }} />
          High: {counts.high} ({getPercentage(counts.high)}%)
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-medium)' }} />
          Medium: {counts.medium} ({getPercentage(counts.medium)}%)
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-low)' }} />
          Low: {counts.low} ({getPercentage(counts.low)}%)
        </span>
      </div>
    </div>
  );
};
