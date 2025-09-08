// /hooks/useBlogFilters.ts
"use client";
import { useMemo, useState } from "react";
import { Blog } from "@/types/admin/blogs";
import { isWithin } from "@/lib/utils";

export function useBlogFilters(initialBlogs: Blog[], perPage = 5) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [time, setTime] = useState<
    "all" | "today" | "this-week" | "this-month" | "this-year"
  >("all");
  const [page, setPage] = useState(1);

  const filteredBlogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return initialBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(q) ||
        blog.summary.toLowerCase().includes(q);

      const matchesStatus = status === "all" || blog.status === status;
      const matchesTime = time === "all" || isWithin(blog.createdAt, time);

      return matchesSearch && matchesStatus && matchesTime;
    });
  }, [initialBlogs, search, status, time]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / perPage));

  // ensure page in range
  if (page > totalPages) setPage(totalPages);

  const currentBlogs = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredBlogs.slice(start, start + perPage);
  }, [filteredBlogs, page, perPage]);

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setTime("all");
    setPage(1);
  };

  return {
    search,
    setSearch,
    status,
    setStatus,
    time,
    setTime,
    page,
    setPage,
    perPage,
    filteredBlogs,
    currentBlogs,
    totalPages,
    clearFilters,
  };
}
