import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SeverityBadge, StatusBadge } from '../src/components/common/Badge';
import { IncidentMetricCard } from '../src/components/metrics/IncidentMetricCard';
import { SeverityBreakdown } from '../src/components/metrics/SeverityBreakdown';
import { INITIAL_INCIDENTS } from '../src/data/mockIncidents';

describe('Metrics & Badges', () => {
  it('renders severity badge with correct role and label', () => {
    render(<SeverityBadge severity="critical" />);
    const badge = screen.getByRole('status', { name: /severity: critical/i });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent(/critical/i);
  });

  it('renders status badge with correct label', () => {
    render(<StatusBadge status="investigating" />);
    const badge = screen.getByRole('status', { name: /status: investigating/i });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent(/investigating/i);
  });

  it('renders metric card with correct count and label', () => {
    render(<IncidentMetricCard label="Active Incidents" count={7} subtitle="Updated just now" />);
    expect(screen.getByText('Active Incidents')).toBeInTheDocument();
    expect(screen.getByTestId('metric-count-active-incidents')).toHaveTextContent('7');
  });

  it('computes severity proportions accurately in breakdown', () => {
    render(<SeverityBreakdown incidents={INITIAL_INCIDENTS} />);
    expect(screen.getByRole('region', { name: /severity distribution/i })).toBeInTheDocument();
    expect(screen.getByText(/Total Incidents/i)).toBeInTheDocument();
  });
});
