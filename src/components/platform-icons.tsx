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
        <img
          key={`${app.title}-${icon}`}
          src={icon}
          alt=""
          aria-hidden="true"
          className="h-4 w-4 opacity-45"
          loading="lazy"
        />
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
