import React, { memo } from "react";

import { IconAlertCircle } from "@tabler/icons-react";
import { Input } from "@ui/input";

interface FormFieldProps {
  id: string;
  label: string;
  autoComplete: string;
  type?: string;
  value: string;
  error?: string | undefined;
  placeholder: string;
  required?: boolean;
  maxLength?: number;
  onChange: (value: string) => void;
  onBlur: () => void;
}

/**
 * FormField component renders a labeled input field with validation error handling.
 *
 * @param id - The unique identifier for the form field
 * @param label - The label text for the form field
 * @param type - The type of input (default is "text")
 * @param value - The current value of the input field
 * @param error - Error message to display if validation fails
 * @param placeholder - Placeholder text for the input field
 * @param required - Whether the field is required (default is false)
 * @param maxLength - Maximum length of the input value
 * @param onChange - Callback function to handle value changes
 * @param onBlur - Callback function to handle blur events
 */
export const FormField = memo(
  ({
    id,
    label,
    autoComplete,
    type = "text",
    value,
    error,
    placeholder,
    required = false,
    maxLength,
    onChange,
    onBlur,
  }: FormFieldProps) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-slate-300"
        >
          {label} {required && "*"}
          {error && (
            <span className="relative ml-2 inline-flex items-center gap-1 text-red-400">
              <IconAlertCircle className="absolute left-0 h-4 w-4" />
              <span className="ml-5">{error}</span>
            </span>
          )}
        </label>
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-required={true}
          autoComplete={autoComplete}
          className={`dark:bg-slate-830 focus:!ring-cyan-570 h-11 rounded-lg border-1 text-slate-200 transition-all duration-300 placeholder:text-slate-500 hover:border-slate-600 focus:shadow-lg focus:!ring-2 focus:!outline-none ${
            error
              ? "border-red-500 focus:border-red-400"
              : "border-slate-730 focus:border-cyan-500"
          }`}
        />
      </div>
    );
  }
);

FormField.displayName = "FormField";
