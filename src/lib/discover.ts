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
import { parameterize } from "./utils";

const LOWERCASE = (value: string) => value.toLocaleLowerCase();

// ─── Fuzzy Search ────────────────────────────────────────────────

/**
 * Fuzzy match a query against a target string.
 * Returns a relevance score: 0 = no match, higher = better.
 * - exact: 100
 * - startsWith query: 90
 * - word-boundary substring: 80
 * - mid-string substring: 70
 * - multi-word fuzzy: 30-75
 * - single-word subsequence: 40-59
 */
function fuzzyScore(query: string, target: string): number {
  if (!query) return 0;
  const q = LOWERCASE(query);
  const t = LOWERCASE(target);

  // Exact match — highest score
  if (t === q) return 100;

  // Contiguous substring
  if (t.includes(q)) {
    if (t.startsWith(q)) return 90;
    const idx = t.indexOf(q);
    if (idx > 0 && t[idx - 1] === " ") return 80; // word boundary
    return 70;
  }

  // Multi-word: each word must appear in target
  const words = q.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    const allMatch = words.every((w) => t.includes(w));
    if (!allMatch) return 0;

    let sum = 0;
    for (const word of words) {
      const idx = t.indexOf(word);
      if (idx === 0) sum += 50;
      else if (idx > 0 && t[idx - 1] === " ") sum += 45;
      else sum += 30;
    }
    return Math.min(75, Math.round(sum / words.length));
  }

  // Single-word fuzzy subsequence
  return fuzzySubsequence(q, t);
}

function fuzzySubsequence(query: string, target: string): number {
  let qi = 0;
  let prevIdx = -2;
  let totalGaps = 0;
  const base = 40;

  for (let ti = 0; ti < target.length && qi < query.length; ti++) {
    if (target[ti] === query[qi]) {
      const gap = ti - prevIdx - 1;
      if (gap > 0) totalGaps += gap;
      prevIdx = ti;
      qi++;
    }
  }
  if (qi < query.length) return 0; // not all chars found

  const density = query.length / (prevIdx + 1);
  return Math.min(59, base + Math.round(density * 20));
}

/** Score an app against a query. Returns 0 = no match. Title matches are heavily boosted. */
export function scoreAppForQuery(app: { title: string; description: string }, query: string): number {
  if (!query?.trim()) return -1;
  const q = query.trim();
  const tScore = fuzzyScore(q, app.title);
  const dScore = fuzzyScore(q, app.description);
  if (tScore > 0) return tScore * 100; // 4000-10000 for title
  return dScore ?? 0; // 0-100 for description
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

export function matchesFilters(app: DiscoverApp, filters: DiscoverFilters) {
  const queryMatch = filters.q.length === 0 || fuzzySearchMatches(filters.q, app);
  const platformMatch = !filters.platform || platformsFor(app).includes(filters.platform);
  const protocolMatch = !filters.protocol || protocolsFor(app).includes(filters.protocol);
  const productMatch = !filters.product || productsFor(app).includes(filters.product);
  return queryMatch && platformMatch && protocolMatch && productMatch;
}

/** Fuzzy match: returns true if query matches title or description with fuzzy logic */
function fuzzySearchMatches(query: string, app: DiscoverApp): boolean {
  return scoreAppForQuery(app, query) > 0;
}

export function filterApps(apps: DiscoverApp[], filters: DiscoverFilters) {
  const filtered = apps.filter((app) => matchesFilters(app, filters));
  // Sort by search relevance when a query is active
  if (filters.q.length > 0) {
    filtered.sort((a, b) => {
      return scoreAppForQuery(b, filters.q) - scoreAppForQuery(a, filters.q);
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
