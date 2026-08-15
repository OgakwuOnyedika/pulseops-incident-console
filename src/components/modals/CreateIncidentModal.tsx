import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Incident, IncidentSeverity } from '../../types/incident';

interface CreateIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newIncident: Incident) => void;
}

export const CreateIncidentModal: React.FC<CreateIncidentModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [service, setService] = useState('auth-service');
  const [severity] = useState<IncidentSeverity>('high');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newInc: Incident = {
      id: `INC-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      service,
      severity,
      status: 'open',
      assignee: 'Unassigned',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: description.trim() || 'No description provided.',
      tags: [service.split('-')[0]],
      auditLog: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          author: 'Current User',
          action: 'Created incident',
        },
      ],
    };

    onCreate(newInc);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Declare New Incident">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label htmlFor="inc-title" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
            Incident Title *
          </label>
          <input
            id="inc-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Elevated 500 error rate on checkout"
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        <div>
          <label htmlFor="inc-service" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
            Affected Service
          </label>
          <select
            id="inc-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              color: 'var(--text-primary)',
            }}
          >
            <option value="auth-service">auth-service</option>
            <option value="billing-engine">billing-engine</option>
            <option value="ingress-gateway">ingress-gateway</option>
            <option value="search-indexer">search-indexer</option>
          </select>
        </div>

        <div>
          <label htmlFor="inc-desc" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
            Description
          </label>
          <textarea
            id="inc-desc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Summary of symptoms and impacted users..."
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Declare Incident
          </Button>
        </div>
      </form>
    </Modal>
  );
};
