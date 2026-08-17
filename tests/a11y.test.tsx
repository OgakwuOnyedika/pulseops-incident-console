import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from '../src/components/common/Modal';
import { SearchInput } from '../src/components/common/SearchInput';

describe('Accessibility & Keyboard Interactions', () => {
  it('clears search input when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [val, setVal] = useState('active search');
      return <SearchInput value={val} onChange={setVal} />;
    };

    render(<TestComponent />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('active search');

    await user.click(input);
    await user.keyboard('{Escape}');
    expect(input).toHaveValue('');
  });

  it('closes modal on Escape key press', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} title="Accessible Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
