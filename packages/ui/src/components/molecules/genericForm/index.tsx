'use client';

import { useState, FormEvent } from 'react';
import type { FC } from 'react';

interface GenericFormProps {
  onSubmit?: (data: Record<string, string>) => void;
  buttonLabel?: string;
  buttonColor?: 'primary' | 'secondary' | 'violet';
  fields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'textarea';
    required?: boolean;
    placeholder?: string;
  }>;
}

const defaultFields = [
  { name: 'firstName', label: 'First Name', type: 'text' as const, required: true, placeholder: 'Enter your first name' },
  { name: 'lastName', label: 'Last Name', type: 'text' as const, required: true, placeholder: 'Enter your last name' },
  { name: 'email', label: 'Email', type: 'email' as const, required: true, placeholder: 'Enter your email' },
  { name: 'company', label: 'Company', type: 'text' as const, required: false, placeholder: 'Enter your company' },
];

export const GenericForm: FC<GenericFormProps> = ({ 
  onSubmit, 
  buttonLabel = 'Submit', 
  buttonColor = 'primary',
  fields = defaultFields 
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        alert('Form submitted successfully!');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Form submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const buttonColorClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    violet: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>
      ))}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${buttonColorClasses[buttonColor]}`}
      >
        {isSubmitting ? 'Submitting...' : buttonLabel}
      </button>
    </form>
  );
};

export default GenericForm;
