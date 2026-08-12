import React from 'react';

interface HeaderProps {
  onNewIncident: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewIncident }) => {
  return (
    <header
      role="banner"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            backgroundColor: '#38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            color: '#0f172a',
            fontSize: '0.875rem',
          }}
        >
          P
        </div>
        <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          PulseOps <span style={{ fontSize: '0.8125rem', fontWeight: 400, color: 'var(--text-muted)' }}>v1.0</span>
        </h1>
        <span
          style={{
            fontSize: '0.6875rem',
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            color: '#38bdf8',
            fontWeight: 600,
          }}
        >
          PROD-CLUSTER-01
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          type="button"
          onClick={onNewIncident}
          style={{
            backgroundColor: '#38bdf8',
            color: '#0f172a',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          + Declare Incident
        </button>
      </div>
    </header>
  );
};
