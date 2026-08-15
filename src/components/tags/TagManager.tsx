import React, { useState } from 'react';
import { CloseIcon } from '../common/Icons';

interface TagManagerProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export const TagManager: React.FC<TagManagerProps> = ({ tags, onAddTag, onRemoveTag }) => {
  const [inputVal, setInputVal] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      e.preventDefault();
      onAddTag(inputVal.trim().toLowerCase());
      setInputVal('');
    } else if (e.key === 'Backspace' && !inputVal && tags.length > 0) {
      onRemoveTag(tags[tags.length - 1]);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: 'var(--bg-elevated)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
            }}
          >
            #{tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              aria-label={`Remove tag ${tag}`}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CloseIcon size={12} />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add tag and press Enter..."
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Add tag input"
        style={{
          width: '100%',
          padding: '6px 8px',
          fontSize: '0.8125rem',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '4px',
          color: 'var(--text-primary)',
        }}
      />
    </div>
  );
};
