import React from 'react';
import { CheckCircleIcon, CloseIcon } from './Icons';

interface NotificationBannerProps {
  message: string;
  onDismiss: () => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        backgroundColor: 'var(--color-success-bg)',
        border: '1px solid var(--color-success)',
        borderRadius: '6px',
        color: '#10b981',
        marginBottom: '16px',
        fontSize: '0.875rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckCircleIcon size={16} />
        <span>{message}</span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        style={{
          background: 'none',
          border: 'none',
          color: '#10b981',
          cursor: 'pointer',
          padding: '2px',
        }}
      >
        <CloseIcon size={14} />
      </button>
    </div>
  );
};
