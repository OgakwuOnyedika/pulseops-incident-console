import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <nav
      aria-label="Incident Table Pagination"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.8125rem',
        color: 'var(--text-secondary)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span>
          Showing {startItem} - {endItem} of {totalItems} incidents
        </span>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span>Per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Select items per page"
            style={{
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              padding: '2px 6px',
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Go to previous page"
          style={{
            padding: '4px 10px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-surface)',
            color: currentPage <= 1 ? 'var(--text-muted)' : 'var(--text-primary)',
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            aria-current={currentPage === pageNum ? 'page' : undefined}
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
              backgroundColor: currentPage === pageNum ? '#38bdf8' : 'var(--bg-surface)',
              color: currentPage === pageNum ? '#0f172a' : 'var(--text-primary)',
              fontWeight: currentPage === pageNum ? 700 : 400,
              cursor: 'pointer',
            }}
          >
            {pageNum}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Go to next page"
          style={{
            padding: '4px 10px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-surface)',
            color: currentPage >= totalPages || totalPages === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
            cursor: currentPage >= totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </nav>
  );
};
