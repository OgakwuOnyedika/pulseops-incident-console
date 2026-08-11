import React from 'react';

interface MetricCardProps {
  label: string;
  count: number;
  subtitle: string;
  accentColor?: string;
}

export const IncidentMetricCard: React.FC<MetricCardProps> = ({
  label,
  count,
  subtitle,
  accentColor = 'var(--border-focus)',
}) => {
  return (
    <div
      role="region"
      aria-label={`${label} Metric`}
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '16px 20px',
        flex: 1,
        minWidth: '180px',
        borderTop: `3px solid ${accentColor}`,
      }}
    >
      <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
        {label}
      </span>
      <div
        data-testid={`metric-count-${label.toLowerCase().replace(/\s+/g, '-')}`}
        style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0' }}
      >
        {count}
      </div>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{subtitle}</span>
    </div>
  );
};
