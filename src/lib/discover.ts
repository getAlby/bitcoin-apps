import {
  CATEGORY_ORDER,
  FEATURED_TITLES,
  PLATFORM_ICON_MAP,
  WALLET_SUBCATEGORY_ORDER,
} from "../data/discover";
import { assetPath } from "./assets";
import type {
  CategoryId,
  DiscoverApp,
  DiscoverFilters,
  PlatformId,
  ProductId,
  ProtocolId,
  WalletSubcategoryId,
} from "../types/discover";
import createFuzzySearch_, { type FuzzyResult, type FuzzySearcher } from "@nozbe/microfuzz";

// CJS/ESM interop: default import may be the function or a module wrapper
const createFuzzySearch = typeof createFuzzySearch_ === "function" ? createFuzzySearch_ : (createFuzzySearch_ as unknown as { default: typeof createFuzzySearch_ }).default;
import { parameterize } from "./utils";

// ─── Fuzzy Search (via @nozbe/microfuzz) ──────────────────────────

const fuzzySearchCache = new WeakMap<DiscoverApp[], FuzzySearcher<DiscoverApp>>();

function getFuzzySearcher(apps: DiscoverApp[]): FuzzySearcher<DiscoverApp> {
  let searcher = fuzzySearchCache.get(apps);
  if (!searcher) {
    searcher = createFuzzySearch(apps, {
      getText: (app) => [app.title, app.description],
      strategy: "smart",
    });
    fuzzySearchCache.set(apps, searcher);
  }
  return searcher;
}

/**
 * Search apps with fuzzy matching.
 * Returns results sorted by relevance (best first), with highlight ranges.
 * Uses microfuzz's "smart" strategy — fuzzy subsequence matching that
 * filters out poor-quality matches (e.g. letters scattered too far apart).
 */
export function searchApps(apps: DiscoverApp[], query: string): FuzzyResult<DiscoverApp>[] {
  if (!query?.trim()) return [];
  return getFuzzySearcher(apps)(query.trim());
}

// ─── Original code continues below ───────────────────────────────

export function platformsFor(app: DiscoverApp): PlatformId[] {
  return app.platforms && app.platforms.length > 0 ? app.platforms : ["web"];
}

export function protocolsFor(app: DiscoverApp): ProtocolId[] {
  const protocols = new Set<ProtocolId>((app.protocols ?? []) as ProtocolId[]);
  if (platformsFor(app).includes("web")) {
    protocols.add("webln");
  }
  return [...protocols];
}

export function productsFor(app: DiscoverApp): ProductId[] {
  const products = new Set<ProductId>(app.products ?? []);
  const protocols = protocolsFor(app);
  if (protocols.includes("nwc")) {
    products.add("alby_hub");
  }
  if (protocols.includes("webln")) {
    products.add("alby_extension");
  }
  return [...products];
}

export function platformIconsFor(app: DiscoverApp) {
  return platformsFor(app)
    .map((platform) => assetPath(PLATFORM_ICON_MAP[platform]))
    .filter(Boolean);
}

export function imagePathFor(app: DiscoverApp) {
  if (app.image) {
    return assetPath(`images/discover/${app.image.replace("pages/discover/", "")}`);
  }
  return assetPath(`images/discover/${parameterize(app.title)}.png`);
}

export function matchesFilters(app: DiscoverApp, filters: DiscoverFilters, searchResults?: Map<string, FuzzyResult<DiscoverApp>>) {
  const queryMatch = filters.q.length === 0 || !!searchResults?.get(app.title);
  const platformMatch = !filters.platform || platformsFor(app).includes(filters.platform);
  const protocolMatch = !filters.protocol || protocolsFor(app).includes(filters.protocol);
  const productMatch = !filters.product || productsFor(app).includes(filters.product);
  return queryMatch && platformMatch && protocolMatch && productMatch;
}

export function filterApps(apps: DiscoverApp[], filters: DiscoverFilters) {
  const searchResults = filters.q.trim().length > 0
    ? new Map(searchApps(apps, filters.q).map((r) => [r.item.title, r]))
    : undefined;
  const filtered = apps.filter((app) => matchesFilters(app, filters, searchResults));
  // Sort by search relevance when a query is active (microfuzz: lower score = better)
  if (searchResults) {
    filtered.sort((a, b) => {
      const aR = searchResults.get(a.title);
      const bR = searchResults.get(b.title);
      return (aR?.score ?? Infinity) - (bR?.score ?? Infinity);
    });
  }
  return filtered;
}

export function cardsByCategory(apps: DiscoverApp[]) {
  const byCategory = new Map<CategoryId, DiscoverApp[]>();
  for (const category of CATEGORY_ORDER) {
    const cards = apps
      .filter((app) => app.categories.includes(category))
      .sort((a, b) => a.title.localeCompare(b.title));
    byCategory.set(category, cards);
  }
  return byCategory;
}

export function visibleCategories(byCategory: Map<CategoryId, DiscoverApp[]>, selectedCategory?: CategoryId) {
  if (selectedCategory) {
    return [selectedCategory];
  }
  return CATEGORY_ORDER.filter((category) => (byCategory.get(category) ?? []).length > 0);
}

export function walletCardsBySubcategory(walletCards: DiscoverApp[]) {
  const bySubcategory = new Map<WalletSubcategoryId, DiscoverApp[]>();
  for (const subcategory of WALLET_SUBCATEGORY_ORDER) {
    const cards = walletCards
      .filter((app) => (app.walletSubcategory ?? []).includes(subcategory))
      .sort((a, b) => a.title.localeCompare(b.title));
    bySubcategory.set(subcategory, cards);
  }
  return bySubcategory;
}

export function featuredCards(apps: DiscoverApp[]) {
  return FEATURED_TITLES.flatMap((title) => {
    const app = apps.find((card) => card.title === title);
    return app ? [app] : [];
  });
}

export function parseFiltersFromSearch(search: string): DiscoverFilters {
  const params = new URLSearchParams(search);
  return {
    category: (params.get("categories") as CategoryId | null) ?? undefined,
    platform: (params.get("platforms") as PlatformId | null) ?? undefined,
    protocol: (params.get("protocols") as ProtocolId | null) ?? undefined,
    product: (params.get("products") as ProductId | null) ?? undefined,
    q: params.get("q") ?? "",
  };
}

export function toSearchParams(filters: DiscoverFilters) {
  const params = new URLSearchParams();
  if (filters.category) params.set("categories", filters.category);
  if (filters.platform) params.set("platforms", filters.platform);
  if (filters.protocol) params.set("protocols", filters.protocol);
  if (filters.product) params.set("products", filters.product);
  if (filters.q.trim().length > 0) params.set("q", filters.q.trim());
  return params;
}
