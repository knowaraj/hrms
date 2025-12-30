// components/ui/Select.tsx - Ant Design Select adapter
import React from "react";
import { Select as AntSelect } from "antd";
import { cn } from "../../utils/cn";

interface SelectOption {
    label: string;
    value: string | number;
    description?: string;
    disabled?: boolean;
}

interface SelectProps {
    options: SelectOption[];
    value?: string | number | (string | number)[];
    defaultValue?: string | number | (string | number)[];
    placeholder?: string;
    multiple?: boolean;
    label?: string;
    description?: string;
    error?: string;
    searchable?: boolean;
    clearable?: boolean;
    loading?: boolean;
    required?: boolean;
    className?: string;
    name?: string;
    id?: string;
    onChange?: (value: string | number | (string | number)[]) => void;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(({ 
  className,
  options = [],
  value,
  defaultValue,
  placeholder = "Select an option",
  multiple = false,
  label,
  description,
  error,
  searchable = false,
  clearable = false,
  loading = false,
  id,
  name,
  required = false,
  onChange,
}, ref) => {
  const selectId = id || `select-${Math.random()?.toString(36)?.substr(2, 9)}`;

  return (
    <div className={cn("relative", className)} ref={ref}>
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            "text-sm font-medium leading-none mb-2 block",
            error ? "text-destructive" : "text-foreground"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <AntSelect
        id={selectId}
        mode={multiple ? 'multiple' : undefined}
        value={value as any}
        defaultValue={defaultValue as any}
        placeholder={placeholder}
        showSearch={searchable}
        allowClear={clearable}
        loading={loading}
        options={options.map(o => ({ label: o.label, value: o.value, disabled: o.disabled }))}
        onChange={(val) => onChange?.(val as any)}
        className="w-full"
        status={error ? 'error' : undefined}
      />

      {description && !error && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
