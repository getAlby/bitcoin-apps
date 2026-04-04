import { Button } from "./ui/button";

interface FilterOption<T extends string> {
  label: string;
  value: T;
}

interface FilterGroupProps<T extends string> {
  title: string;
  options: Array<FilterOption<T>>;
  selected?: T;
  onSelect: (value?: T) => void;
}

export function FilterGroup<T extends string>({ title, options, selected, onSelect }: FilterGroupProps<T>) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">{title}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {options.map((option) => {
          const active = option.value === selected;
          return (
            <Button
              key={option.value}
              size="filter"
              active={active}
              onClick={() => onSelect(active ? undefined : option.value)}
              aria-pressed={active}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

