import type { DiscoverApp } from "../types/discover";
import { cn } from "../lib/utils";
import { AppImage, PlatformIcons } from "./platform-icons";
import { Card, CardDescription, CardTitle } from "./ui/card";

interface AppCardProps {
  app: DiscoverApp;
}

export function AppCard({ app }: AppCardProps) {
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
              {app.title}
            </CardTitle>
          </div>
          <CardDescription className="discover-line-clamp-2 h-14 text-left text-lg leading-7 text-tertiary">
            {app.description}
          </CardDescription>
        </div>
        <PlatformIcons app={app} className="mt-auto flex flex-wrap items-center gap-3 pt-4 leading-none" />
      </a>
    </Card>
  );
}
