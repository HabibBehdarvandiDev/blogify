// /types/blog.ts
export type BlogStatus = "published" | "draft";

export interface Blog {
  id: string;
  title: string;
  summary: string;
  thumbnail_url: string;
  content: string;
  status: BlogStatus;
  author_id: string;
  likes_count: number;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}
