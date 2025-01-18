// src/types/link.ts
export interface RegisteredLink {
  _id: string;
  shortCode: string;
  longUrl: string;
  shortUrl: string;
  visitCount: number;
  createdAt: string;
  expiresAt?: string;
  customSlug?: string;
}

export interface SortConfig {
  key: keyof RegisteredLink;
  direction: "asc" | "desc";
}
