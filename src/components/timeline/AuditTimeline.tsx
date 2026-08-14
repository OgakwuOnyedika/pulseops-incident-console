import React from 'react';
import { AuditEntry } from '../../types/incident';

interface AuditTimelineProps {
  entries: AuditEntry[];
}

export const AuditTimeline: React.FC<AuditTimelineProps> = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>No audit events logged.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {entries.map((entry) => (
        <li
          key={entry.id}
          style={{
            position: 'relative',
            paddingLeft: '20px',
            marginBottom: '12px',
            borderLeft: '2px solid var(--border-color)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {new Date(entry.timestamp).toLocaleTimeString()} · {entry.author}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            {entry.action}
          </div>
          {entry.detail && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {entry.detail}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
