import type { DiscoverApp } from "../types/discover";
import { imagePathFor, platformIconsFor } from "../lib/discover";
import { assetPath } from "../lib/assets";

interface PlatformIconsProps {
  app: DiscoverApp;
  className?: string;
}

export function PlatformIcons({ app, className }: PlatformIconsProps) {
  const icons = platformIconsFor(app).slice(0, 4);
  return (
    <div className={className ?? "flex flex-wrap items-center gap-3 leading-none"}>
      {icons.map((icon) => (
        <span key={`${app.title}-${icon}`} className="inline-flex h-4 w-4 items-center justify-center text-zinc-400">
          <span
            className="discover-platform-icon h-4 w-4"
            style={{ ["--platform-icon-url" as string]: `url(${icon})` }}
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );
}

interface AppImageProps {
  app: DiscoverApp;
  className: string;
}

export function AppImage({ app, className }: AppImageProps) {
  const fallback = assetPath("images/discover/alby-hub.png");
  const imagePath = imagePathFor(app);
  return (
    <img
      src={imagePath}
      alt={app.title}
      className={className}
      loading="lazy"
      onError={(event) => {
        const target = event.currentTarget;
        if (target.src.endsWith(fallback)) {
          return;
        }
        target.src = fallback;
      }}
    />
  );
}
