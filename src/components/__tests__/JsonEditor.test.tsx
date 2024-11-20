import React from 'react';
import { render, screen } from '@testing-library/react';
import { JsonEditor } from '../JsonEditor';

// Mock Monaco Editor
jest.mock('@monaco-editor/react', () => {
  return function MockEditor({ value, onChange }: any) {
    return (
      <textarea
        data-testid="mock-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };
});

describe('JsonEditor', () => {
  it('renders editor with initial value', () => {
    const mockValue = '{"test": "value"}';
    render(
      <JsonEditor
        value={mockValue}
        onChange={() => {}}
      />
    );
    
    expect(screen.getByTestId('mock-editor')).toHaveValue(mockValue);
  });

  it('displays error message when provided', () => {
    const error = 'Invalid JSON';
    render(
      <JsonEditor
        value="{}"
        onChange={() => {}}
        error={error}
      />
    );
    
    expect(screen.getByText(error)).toBeInTheDocument();
  });
});