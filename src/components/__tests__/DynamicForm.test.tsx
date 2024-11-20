import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DynamicForm } from '../DynamicForm';
import { FormSchema } from '../../types/schema';

const mockSchema: FormSchema = {
  formTitle: "Test Form",
  formDescription: "Test Description",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Name",
      required: true,
      placeholder: "Enter name"
    },
    {
      id: "email",
      type: "email",
      label: "Email",
      required: true,
      placeholder: "Enter email",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email"
      }
    }
  ]
};

describe('DynamicForm', () => {
  it('renders form with correct fields', () => {
    render(<DynamicForm schema={mockSchema} />);
    
    expect(screen.getByText('Test Form')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    render(<DynamicForm schema={mockSchema} />);
    
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<DynamicForm schema={mockSchema} />);
    
    const emailInput = screen.getByLabelText(/Email/);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<DynamicForm schema={mockSchema} />);
    
    fireEvent.change(screen.getByLabelText(/Name/), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: 'john@example.com' }
    });
    
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Form submitted:',
        expect.objectContaining({
          name: 'John Doe',
          email: 'john@example.com'
        })
      );
    });
  });
});