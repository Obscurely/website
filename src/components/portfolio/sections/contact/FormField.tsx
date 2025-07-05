import React from "react";
import { Input } from "@ui/input";
import { IconAlertCircle } from "@tabler/icons-react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  error?: string | undefined;
  placeholder: string;
  required?: boolean;
  maxLength?: number;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const FormField = ({
  id,
  label,
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
        className={`dark:bg-slate-830 focus:!ring-cyan-570 h-11 rounded-lg border-1 text-slate-200 transition-all duration-300 placeholder:text-slate-500 hover:border-slate-600 focus:shadow-lg focus:!ring-2 focus:!outline-none ${
          error
            ? "border-red-500 focus:border-red-400"
            : "border-slate-730 focus:border-cyan-500"
        }`}
      />
    </div>
  );
};
