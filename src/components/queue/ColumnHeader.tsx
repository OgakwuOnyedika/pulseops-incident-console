import React from 'react';
import { SortConfig, SortField } from '../../types/incident';

interface ColumnHeaderProps {
  label: string;
  field: SortField;
  currentSort: SortConfig;
  onSort: (field: SortField) => void;
  style?: React.CSSProperties;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  label,
  field,
  currentSort,
  onSort,
  style,
}) => {
  const isSorted = currentSort.field === field;

  return (
    <th
      aria-sort={isSorted ? (currentSort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
      style={{
        textAlign: 'left',
        padding: '10px 16px',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--text-secondary)',
        borderBottom: '1px solid var(--border-color)',
        ...style,
      }}
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          font: 'inherit',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: 0,
        }}
      >
        <span>{label}</span>
        <span aria-hidden="true" style={{ fontSize: '0.6875rem' }}>
          {isSorted ? (currentSort.direction === 'asc' ? '▲' : '▼') : '↕'}
        </span>
      </button>
    </th>
  );
};
