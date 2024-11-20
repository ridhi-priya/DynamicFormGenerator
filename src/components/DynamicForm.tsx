import React from 'react';
import { useForm } from 'react-hook-form';
import { FormSchema } from '../types/schema';
import { toast } from 'sonner';

interface DynamicFormProps {
  schema: FormSchema;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log('Form submitted:', data);
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit form');
    }
  };

  const renderField = (field: any) => {
    const commonProps = {
      ...register(field.id, {
        required: field.required && `${field.label} is required`,
        pattern: field.validation?.pattern
          ? {
              value: new RegExp(field.validation.pattern),
              message: field.validation.message,
            }
          : undefined,
      }),
      placeholder: field.placeholder,
      className: `flex w-full rounded-md border bg-white dark:bg-gray-900 dark:text-gray-100 px-3 py-2 text-sm ring-offset-white dark:ring-offset-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300 focus:ring-offset-2 ${
        errors[field.id]
          ? 'border-red-500'
          : 'border-gray-200 dark:border-gray-700'
      }`,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            className={`${commonProps.className} h-20 resize-none`}
          />
        );

      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option: any) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option.value}
                  {...register(field.id, {
                    required: field.required && `${field.label} is required`,
                  })}
                  className="h-4 w-4 border-gray-300 text-gray-900 dark:text-gray-100 focus:ring-gray-950 dark:focus:ring-gray-300"
                />
                <span className="text-sm dark:text-gray-300">{option.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            {...commonProps}
            className={`${commonProps.className} h-10`}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight dark:text-white">
          {schema.formTitle}
        </h2>
        {schema.formDescription && (
          <p className="text-gray-500 dark:text-gray-400">{schema.formDescription}</p>
        )}
      </div>

      {schema.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label
            htmlFor={field.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {renderField(field)}

          {errors[field.id] && (
            <p className="text-sm text-red-500">
              {errors[field.id]?.message as string}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-md bg-gray-900 dark:bg-gray-100 px-4 py-2 text-sm font-medium text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-100/90 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};