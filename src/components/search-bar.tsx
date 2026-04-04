import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    requestAnimationFrame(() => {
      input.focus({ preventScroll: true });
      const end = input.value.length;
      input.setSelectionRange(end, end);
    });
  }, []);

  const showFakeCaret = focused && value.length === 0;

  return (
    <div className="mb-16 flex justify-center">
      <div className="w-full max-w-md">
        <label htmlFor="discover-search" className="sr-only">
          Search apps
        </label>
        <div className="discover-search-shell relative flex items-center rounded-full border border-[#D1D5DB] bg-white py-3 pl-[30px] pr-[30px] shadow-sm focus-within:border-[#FFDA4D] focus-within:ring-2 focus-within:ring-[#FFDA4D]">
          <span aria-hidden="true" className={showFakeCaret ? "discover-search-caret" : "hidden"} />
          <Input
            id="discover-search"
            ref={inputRef}
            value={value}
            placeholder="Search apps..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(event) => onChange(event.target.value)}
            className={`h-auto w-full border-0 bg-transparent p-0 text-lg text-secondary shadow-none ring-0 focus-visible:ring-0 ${
              showFakeCaret ? "discover-search-input--fake-caret" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}
