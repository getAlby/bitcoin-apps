import { CATEGORY_ORDER, CATEGORY_PILL_LABELS } from "../data/discover";
import type { CategoryId } from "../types/discover";
import { Button } from "./ui/button";

interface CategoryPillsProps {
  selected?: CategoryId;
  onSelect: (value?: CategoryId) => void;
}

export function CategoryPills({ selected, onSelect }: CategoryPillsProps) {
  return (
    <div className="mb-8 px-3">
      <div className="mb-2 flex items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Categories</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORY_ORDER.map((category) => {
          const active = category === selected;
          return (
            <Button
              key={category}
              size="category"
              active={active}
              onClick={() => onSelect(active ? undefined : category)}
              aria-pressed={active}
            >
              {CATEGORY_PILL_LABELS[category]}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

