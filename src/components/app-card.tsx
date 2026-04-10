import type { DiscoverApp } from "../types/discover";
import { cn } from "../lib/utils";
import { AppImage, PlatformIcons } from "./platform-icons";
import { Card, CardDescription, CardTitle } from "./ui/card";

interface AppCardProps {
  app: DiscoverApp;
  searchQuery?: string;
}

/** Find the start index and length of the best matching substring for highlighting */
function bestMatchIndex(text: string, query: string): [number, number] {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // Exact or substring contiguous match
  const idx = lowerText.indexOf(lowerQuery);
  if (idx >= 0) return [idx, lowerQuery.length];

  // Multi-word: highlight the region spanning first and last matching word
  const words = lowerQuery.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    const positions = words.map((w) => ({ pos: lowerText.indexOf(w), len: w.length })).filter((w) => w.pos >= 0);
    if (positions.length === words.length) {
      positions.sort((a, b) => a.pos - b.pos);
      const start = positions[0].pos;
      const end = positions[positions.length - 1].pos + positions[positions.length - 1].len;
      return [start, end - start];
    }
  }

  // Fuzzy: find the subsequence and highlight the span
  let qi = 0;
  let firstIdx = -1;
  let lastIdx = -1;
  for (let ti = 0; ti < lowerText.length && qi < lowerQuery.length; ti++) {
    if (lowerText[ti] === lowerQuery[qi]) {
      if (firstIdx === -1) firstIdx = ti;
      lastIdx = ti;
      qi++;
    }
  }
  if (qi === lowerQuery.length) {
    return [firstIdx, lastIdx - firstIdx + 1];
  }
  return [-1, 0];
}

/** Highlight matching text — wraps the match in <mark> style */
function HighlightedText({ text, query }: { text: string; query?: string }) {
  if (!query?.trim()) return <>{text}</>;

  const [start, len] = bestMatchIndex(text, query.trim());
  if (start < 0 || len <= 0) return <>{text}</>;

  return (
    <>
      {text.slice(0, start)}
      <span className="bg-[#FFF9BB] font-semibold text-secondary">{text.slice(start, start + len)}</span>
      {text.slice(start + len)}
    </>
  );
}

export function AppCard({ app, searchQuery }: AppCardProps) {
  const surfaceClass = cn(
    "discover-hover-sheen-premium min-h-[240px] rounded-2xl border border-[rgba(228,230,234,0.5)] bg-[linear-gradient(180deg,_#FFFFFF_64.29%,_rgba(228,230,234,0.5)_225.79%)] p-6 shadow-[0px_5px_3px_rgba(0,0,0,0.01),0px_2px_2px_rgba(0,0,0,0.03),0px_1px_1px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out hover:border-[#FFEFB3] hover:bg-[linear-gradient(180deg,_#FFFDEA_-10.32%,_#FFF9BB_50.44%,_#FFE65C_104%,_#FFD500_155.95%)] hover:opacity-95",
  );

  return (
    <Card className={surfaceClass} data-testid={`app-card-${app.title}`}>
      <a href={app.url} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col">
        <div className="flex flex-col gap-5">
          <div className="flex min-w-0 items-center gap-5">
            <AppImage app={app} className="h-[60px] w-[60px] flex-shrink-0 rounded-lg object-contain" />
            <CardTitle className="discover-line-clamp-1 min-w-0 text-left text-2xl font-medium text-secondary">
              <HighlightedText text={app.title} query={searchQuery} />
            </CardTitle>
          </div>
          <CardDescription className="discover-line-clamp-2 h-14 text-left text-lg leading-7 text-tertiary">
            <HighlightedText text={app.description} query={searchQuery} />
          </CardDescription>
        </div>
        <PlatformIcons app={app} className="mt-auto flex flex-wrap items-center gap-3 pt-4 leading-none" />
      </a>
    </Card>
  );
}
