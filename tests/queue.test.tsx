import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { IncidentQueueTable } from '../src/components/queue/IncidentQueueTable';

describe('IncidentQueueTable Component', () => {
  it('renders table headers and incidents upon loading', async () => {
    render(<IncidentQueueTable onSelectIncident={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText('INC-101')).toBeInTheDocument();
    });

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('filters queue items when typing in search input', async () => {
    const user = userEvent.setup();
    render(<IncidentQueueTable onSelectIncident={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('INC-101')).toBeInTheDocument();
    });

    const searchInput = screen.getByRole('searchbox');
    await user.type(searchInput, 'Elasticsearch');

    await waitFor(() => {
      expect(screen.getByText('INC-105')).toBeInTheDocument();
      expect(screen.queryByText('INC-101')).not.toBeInTheDocument();
    });
  });

  it('allows toggling row selection', async () => {
    const user = userEvent.setup();
    render(<IncidentQueueTable onSelectIncident={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('INC-101')).toBeInTheDocument();
    });

    const checkbox = screen.getByRole('checkbox', { name: /select incident inc-101/i });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByText(/1 incident selected/i)).toBeInTheDocument();
  });
});
