import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { Calendar, Clock, SparkleIcon, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogsPage = async () => {
    // Fetch all blogs with author information
    const blogs = await prisma.blogs.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            summary: true,
            thumbnail_url: true,
            content: true,
            status: true,
            createdAt: true,
            users: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        where: {
            status: "published", // Only show published blogs
        },
    });

    return (
        <div className="min-h-screen bg-background">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Stats Section */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
                        Discover Amazing Stories
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
                        Explore our collection of {blogs.length} carefully
                        crafted articles covering technology, design, and
                        innovation.
                    </p>
                    <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{blogs.length} Articles</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            <span>Updated Daily</span>
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                {blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <Card
                                key={blog.id}
                                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-border overflow-hidden"
                            >
                                <CardHeader className="p-0">
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={
                                                blog.thumbnail_url ||
                                                `/placeholder.svg?height=240&width=400&query=${
                                                    encodeURIComponent(
                                                        blog.title
                                                    ) || "/placeholder.svg"
                                                }`
                                            }
                                            alt={blog.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6">

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors text-balance">
                                        {blog.title}
                                    </h3>

                                    {/* Summary */}
                                    <p className="text-muted-foreground mb-4 line-clamp-3 text-pretty">
                                        {blog.summary}
                                    </p>

                                    {/* Meta Information */}
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span>
                                                {blog.users?.name ||
                                                    "Anonymous"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>
                                                {formatDate(blog.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Read More Button */}
                                    <div className="mt-6">
                                        <Button
                                            asChild
                                            className="w-full"
                                        >
                                            <Link href={`/blogs/${blog.id}`}>
                                                Read Article
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                            <Tag className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-semibold text-foreground mb-4">
                            No Articles Yet
                        </h3>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            We're working on creating amazing content for you.
                            Check back soon for new articles!
                        </p>
                        <Button asChild>
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </div>
                )}

                {/* Load More Section */}
                {blogs.length > 0 && (
                    <div className="text-center mt-16">
                        <p className="text-muted-foreground mb-6">
                            Showing all {blogs.length} articles
                        </p>
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/auth/register">
                                Subscribe for Updates
                                <SparkleIcon />
                            </Link>
                        </Button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-card border-t border-border mt-20">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-bold text-card-foreground mb-4">
                                Blogify
                            </h3>
                            <p className="text-muted-foreground mb-4 max-w-md">
                                Discover amazing stories, insights, and ideas
                                from our community of writers and creators.
                            </p>
                            <div className="flex gap-4">
                                <Button variant="outline" size="sm">
                                    Twitter
                                </Button>
                                <Button variant="outline" size="sm">
                                    LinkedIn
                                </Button>
                                <Button variant="outline" size="sm">
                                    GitHub
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-card-foreground mb-4">
                                Quick Links
                            </h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    <Link
                                        href="/"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blogs"
                                        className="hover:text-primary transition-colors"
                                    >
                                        All Blogs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        className="hover:text-primary transition-colors"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-card-foreground mb-4">
                                Categories
                            </h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Technology
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Design
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Development
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Innovation
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                        <p>&copy; 2024 Blogify. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <Link
                                href="#"
                                className="hover:text-primary transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#"
                                className="hover:text-primary transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BlogsPage;
