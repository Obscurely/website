import React from "react";
import { Textarea } from "@ui/textarea";
import { IconAlertCircle } from "@tabler/icons-react";

interface FormTextareaProps {
  id: string;
  label: string;
  value: string;
  error?: string | undefined;
  placeholder: string;
  required?: boolean;
  maxLength?: number;
  onChange: (value: string) => void;
  onBlur: () => void;
  className?: string;
}

export const FormTextarea = ({
  id,
  label,
  value,
  error,
  placeholder,
  required = false,
  maxLength,
  onChange,
  onBlur,
  className = "",
}: FormTextareaProps) => {
  return (
    <div className={`flex flex-1 flex-col space-y-2 ${className}`}>
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
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        aria-invalid={!!error}
        className={`scrollbar-thin scrollbar-track-slate-900/0 scrollbar-thumb-slate-600 k focus:!ring-cyan-570 dark:bg-slate-830 max-h-[10px] min-h-[100px] flex-1 resize-none overflow-y-auto rounded-lg border-1 wrap-anywhere text-slate-200 transition-all duration-300 placeholder:text-slate-500 hover:border-slate-600 focus:shadow-lg focus:!ring-2 focus:!outline-none lg:max-h-[199.5px] xl:max-h-[112px] ${
          error
            ? "border-red-500 focus:border-red-400"
            : "border-slate-730 focus:border-cyan-500"
        }`}
      />
    </div>
  );
};
