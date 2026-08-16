import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { IncidentMetricCard } from '../components/metrics/IncidentMetricCard';
import { SeverityBreakdown } from '../components/metrics/SeverityBreakdown';
import { CreateIncidentModal } from '../components/modals/CreateIncidentModal';
import { IncidentQueueTable } from '../components/queue/IncidentQueueTable';
import { INITIAL_INCIDENTS } from '../data/mockIncidents';
import { Incident, IncidentStatus } from '../types/incident';
import { IncidentDetailDrawer } from './IncidentDetailDrawer';

export const IncidentDashboardView: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleStatusChange = (id: string, newStatus: IncidentStatus) => {
    if (selectedIncident && selectedIncident.id === id) {
      setSelectedIncident({ ...selectedIncident, status: newStatus });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onNewIncident={() => setIsCreateModalOpen(true)} />

      <main style={{ padding: '24px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <IncidentMetricCard label="Active Incidents" count={7} subtitle="1 Critical requiring review" accentColor="var(--color-critical)" />
          <IncidentMetricCard label="Mitigated" count={3} subtitle="Monitoring recovery" accentColor="var(--color-low)" />
          <IncidentMetricCard label="MTTR (P95)" count={24} subtitle="Minutes (past 24h)" accentColor="#38bdf8" />
        </div>

        <IncidentQueueTable onSelectIncident={setSelectedIncident} />

        <SeverityBreakdown incidents={INITIAL_INCIDENTS} />
      </main>

      <IncidentDetailDrawer
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onStatusChange={handleStatusChange}
      />

      <CreateIncidentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(newInc) => {
          setSelectedIncident(newInc);
        }}
      />
    </div>
  );
};
