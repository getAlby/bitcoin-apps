import type {
  CategoryId,
  PlatformId,
  ProductId,
  ProtocolId,
  WalletSubcategoryId,
} from "../types/discover";

export const CATEGORY_ORDER: CategoryId[] = [
  "chats_and_communities",
  "messengers",
  "entertainment",
  "streaming",
  "music",
  "podcast_players",
  "publisher_tools",
  "shopping",
  "rewards",
  "payments",
  "wallets",
  "trading",
  "gaming",
  "ai",
  "privacy",
  "node_management",
  "misc",
];

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  ai: "AI",
  chats_and_communities: "Social Media",
  messengers: "Messengers",
  entertainment: "Entertainment",
  streaming: "Streaming",
  music: "Music",
  shopping: "Shopping",
  rewards: "Rewards",
  podcast_players: "Podcasts",
  privacy: "Privacy",
  publisher_tools: "Publishing",
  trading: "Trading",
  gaming: "Games",
  node_management: "Node Tools",
  payments: "Payments",
  wallets: "Wallets",
  misc: "Misc",
};

export const CATEGORY_PILL_LABELS: Record<CategoryId, string> = {
  ai: "🤖 AI",
  chats_and_communities: "🌐 Social Media",
  messengers: "💬 Messengers",
  entertainment: "🎬 Entertainment",
  streaming: "📡 Streaming",
  music: "🎵 Music",
  shopping: "🛍️ Shopping",
  rewards: "🎁 Rewards",
  podcast_players: "🎧 Podcasts",
  privacy: "🛡️ Privacy",
  publisher_tools: "📝 Publishing",
  trading: "📈 Trading",
  gaming: "🎮 Games",
  node_management: "⚙️ Node Tools",
  payments: "💸 Payments",
  wallets: "👛 Wallets",
  misc: "✨ Misc",
};

export const PLATFORM_OPTIONS: Array<{ label: string; value: PlatformId }> = [
  { label: "Web", value: "web" },
  { label: "iOS", value: "ios" },
  { label: "Android", value: "android" },
  { label: "Desktop", value: "desktop" },
];

export const PRODUCT_OPTIONS: Array<{ label: string; value: ProductId }> = [
  { label: "Alby Hub", value: "alby_hub" },
  { label: "Alby Extension", value: "alby_extension" },
  { label: "Alby Go", value: "alby_go" },
  { label: "Alby Account", value: "alby_account" },
];

export const PROTOCOL_OPTIONS: Array<{ label: string; value: ProtocolId }> = [
  { label: "NWC", value: "nwc" },
  { label: "WebLN", value: "webln" },
  { label: "Bitcoin Connect", value: "bitcoin_connect" },
];

export const FEATURED_TITLES = ["Alby Hub", "PayPerQ", "Wave Space"] as const;

export const PLATFORM_ICON_MAP: Record<PlatformId, string> = {
  web: "images/icons/web.svg",
  ios: "images/icons/ios.svg",
  android: "images/icons/android.svg",
  desktop: "images/icons/desktop.svg",
};

export const WALLET_SUBCATEGORY_ORDER: WalletSubcategoryId[] = [
  "nwc_wallets",
  "wallet_interfaces",
];

export const WALLET_SUBCATEGORY_LABELS: Record<WalletSubcategoryId, string> = {
  nwc_wallets: "NWC Wallets",
  wallet_interfaces: "Wallet Interfaces",
};
