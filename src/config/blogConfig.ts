import { Blog } from "@/types/admin/blogs";

export const mockBlogs: Blog[] = [
    {
        id: "1",
        title: "Getting Started with Next.js",
        summary:
            "Learn the basics of Next.js framework and how to build modern web applications",
        thumbnail_url: "/nextjs-tutorial.jpg",
        content:
            "Next.js is a powerful React framework that enables you to build full-stack web applications. By extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds, Next.js provides a comprehensive solution for modern web development. In this comprehensive guide, we'll explore the fundamentals of Next.js, including server-side rendering, static site generation, API routes, and much more. Whether you're a beginner or an experienced developer, this tutorial will help you master the art of building scalable and performant web applications with Next.js.",
        status: "published",
        author_id: "user1",
        likes_count: 42,
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
    },
    {
        id: "2",
        title: "Advanced TypeScript Patterns",
        summary:
            "Explore advanced TypeScript techniques for better code quality",
        thumbnail_url: "/typescript-patterns.png",
        content:
            "TypeScript offers many advanced patterns that can significantly improve your code quality and developer experience. In this article, we'll dive deep into conditional types, mapped types, template literal types, and other advanced features. We'll also explore how to use these patterns in real-world scenarios to create more robust and maintainable applications.",
        status: "draft",
        author_id: "user1",
        likes_count: 18,
        createdAt: "2024-01-14T15:30:00Z",
        updatedAt: "2024-01-14T15:30:00Z",
    },
    {
        id: "3",
        title: "Building Scalable APIs",
        summary: "Best practices for API development and architecture",
        thumbnail_url: "/api-development.png",
        content:
            "When building APIs at scale, there are many considerations to keep in mind. From proper error handling and validation to authentication and rate limiting, this guide covers all the essential aspects of building robust APIs that can handle production workloads.",
        status: "published",
        author_id: "user1",
        likes_count: 67,
        createdAt: "2024-01-13T09:15:00Z",
        updatedAt: "2024-01-13T09:15:00Z",
    },
    {
        id: "4",
        title: "React Performance Optimization",
        summary: "Techniques to optimize React application performance",
        thumbnail_url: "/react-performance.jpg",
        content:
            "Performance is crucial for user experience. Learn about React.memo, useMemo, useCallback, and other optimization techniques.",
        status: "published",
        author_id: "user1",
        likes_count: 89,
        createdAt: "2024-01-12T14:20:00Z",
        updatedAt: "2024-01-12T14:20:00Z",
    },
    {
        id: "5",
        title: "Database Design Principles",
        summary: "Fundamental principles for designing efficient databases",
        thumbnail_url: "/database-design.jpg",
        content:
            "Good database design is the foundation of any successful application. This article covers normalization, indexing, and other key concepts.",
        status: "draft",
        author_id: "user1",
        likes_count: 23,
        createdAt: "2024-01-11T11:45:00Z",
        updatedAt: "2024-01-11T11:45:00Z",
    },
    {
        id: "6",
        title: "Modern CSS Techniques",
        summary: "Exploring the latest CSS features and best practices",
        thumbnail_url: "/modern-css.jpg",
        content:
            "CSS has evolved significantly. Learn about CSS Grid, Flexbox, custom properties, and modern layout techniques.",
        status: "published",
        author_id: "user1",
        likes_count: 34,
        createdAt: "2024-01-10T16:30:00Z",
        updatedAt: "2024-01-10T16:30:00Z",
    },
];
