import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
};

export const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

export function isWithin(date: string, filter: string) {
    const now = new Date();
    const target = new Date(date);

    switch (filter) {
        case "today":
            return target.toDateString() === now.toDateString();
        case "this-week": {
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 7);
            return target >= weekAgo;
        }
        case "this-month":
            return (
                target.getMonth() === now.getMonth() &&
                target.getFullYear() === now.getFullYear()
            );
        case "this-year":
            return target.getFullYear() === now.getFullYear();
        default:
            return true;
    }
}
