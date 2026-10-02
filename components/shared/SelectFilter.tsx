import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFilterProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  allowClear?: boolean;
}

export function SelectFilter({ value, onValueChange, options, placeholder = "Filter...", allowClear = true }: SelectFilterProps) {
  return (
    <Select value={value || (allowClear ? "_all" : undefined)} onValueChange={(val) => onValueChange(val === "_all" || val === null ? "" : val)}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allowClear && <SelectItem value="_all">All {placeholder}</SelectItem>}
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
