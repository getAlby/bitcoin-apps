export type CategoryId =
  | "ai"
  | "chats_and_communities"
  | "messengers"
  | "entertainment"
  | "streaming"
  | "music"
  | "podcast_players"
  | "publisher_tools"
  | "shopping"
  | "rewards"
  | "payments"
  | "wallets"
  | "trading"
  | "gaming"
  | "privacy"
  | "node_management"
  | "misc";

export type PlatformId = "web" | "ios" | "android" | "desktop";
export type ProtocolId = "nwc" | "webln" | "bitcoin_connect";
export type ProductId = "alby_hub" | "alby_extension" | "alby_go" | "alby_account";
export type WalletSubcategoryId = "nwc_wallets" | "wallet_interfaces";

export interface DiscoverApp {
  categories: CategoryId[];
  title: string;
  description: string;
  url: string;
  platforms?: PlatformId[];
  protocols?: Exclude<ProtocolId, "webln">[];
  products?: ProductId[];
  image?: string;
  walletSubcategory?: WalletSubcategoryId[];
}

export interface DiscoverFilters {
  category?: CategoryId;
  platform?: PlatformId;
  protocol?: ProtocolId;
  product?: ProductId;
  q: string;
}
