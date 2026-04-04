import { describe, expect, it } from "vitest";
import type { DiscoverApp, DiscoverFilters } from "../types/discover";
import { cardsByCategory, featuredCards, filterApps, productsFor, protocolsFor, walletCardsBySubcategory } from "./discover";

const baseFilters: DiscoverFilters = { q: "" };

describe("discover selectors", () => {
  it("derives webln from web platform", () => {
    const app: DiscoverApp = {
      categories: ["misc"],
      title: "Example",
      description: "Example",
      url: "https://example.com",
      platforms: ["web"],
    };
    expect(protocolsFor(app)).toContain("webln");
  });

  it("derives products from protocols", () => {
    const app: DiscoverApp = {
      categories: ["misc"],
      title: "Example",
      description: "Example",
      url: "https://example.com",
      protocols: ["nwc"],
      platforms: ["web"],
    };
    const products = productsFor(app);
    expect(products).toContain("alby_hub");
    expect(products).toContain("alby_extension");
  });

  it("filters by single-select category behavior", () => {
    const apps: DiscoverApp[] = [
      { categories: ["ai"], title: "A", description: "test", url: "https://a" },
      { categories: ["music"], title: "B", description: "test", url: "https://b" },
    ];
    const filtered = filterApps(apps, { ...baseFilters, q: "test" });
    const byCategory = cardsByCategory(filtered);
    expect(byCategory.get("ai")).toHaveLength(1);
    expect(byCategory.get("music")).toHaveLength(1);
  });

  it("groups wallet cards by wallet subcategory", () => {
    const cards: DiscoverApp[] = [
      {
        categories: ["wallets"],
        title: "Wallet A",
        description: "a",
        url: "https://a",
        walletSubcategory: ["nwc_wallets"],
      },
      {
        categories: ["wallets"],
        title: "Wallet B",
        description: "b",
        url: "https://b",
        walletSubcategory: ["wallet_interfaces"],
      },
    ];
    const grouped = walletCardsBySubcategory(cards);
    expect(grouped.get("nwc_wallets")).toHaveLength(1);
    expect(grouped.get("wallet_interfaces")).toHaveLength(1);
  });

  it("selects configured featured cards", () => {
    const cards: DiscoverApp[] = [
      { categories: ["wallets"], title: "Alby Hub", description: "x", url: "https://a" },
      { categories: ["ai"], title: "PayPerQ", description: "x", url: "https://b" },
      { categories: ["trading"], title: "Wave Space", description: "x", url: "https://c" },
    ];
    expect(featuredCards(cards)).toHaveLength(3);
  });
});
