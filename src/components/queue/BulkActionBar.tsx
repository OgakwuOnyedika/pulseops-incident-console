import React from 'react';
import { Button } from '../common/Button';

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkResolve: () => void;
  onBulkAssign: (assignee: string) => void;
}

export const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  onClearSelection,
  onBulkResolve,
  onBulkAssign,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div
      role="toolbar"
      aria-label="Bulk actions toolbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-focus)',
        borderRadius: '6px',
        marginBottom: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          role="status"
          aria-live="polite"
          style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}
        >
          {selectedCount} incident{selectedCount > 1 ? 's' : ''} selected
        </span>
        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          Deselect All
        </Button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Button size="sm" onClick={() => onBulkAssign('On-Call Team')}>
          Assign to On-Call
        </Button>
        <Button variant="primary" size="sm" onClick={onBulkResolve}>
          Mark Resolved
        </Button>
      </div>
    </div>
  );
};
