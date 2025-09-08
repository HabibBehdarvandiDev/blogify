import React from "react";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Share2, Heart, User, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import LikeButton from "./like-button";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShareButton from "./share-button";

interface SingleBlogPageProps {
    params: {
        id: string;
    };
}

const SingleBlogPage = async ({ params }: SingleBlogPageProps) => {
    const session = await getServerSession(authOptions);
    const blog = await prisma.blogs.findUnique({
        where: {
            id: params.id,
        },
        select: {
            id: true,
            title: true,
            summary: true,
            content: true,
            thumbnail_url: true,
            createdAt: true,
            updatedAt: true,
            likes_count: true,
            users: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
            bloglikes: session?.user
                ? {
                      where: { user_id: session.user.id },
                      select: { id: true },
                  }
                : false,
        },
    });

    if (!blog) {
        notFound();
    }
    const readingTime = calculateReadingTime(blog.content);
    const initiallyLiked = blog.bloglikes?.length > 0;

    return (
        <div className="min-h-screen bg-background">
            {/* Header Navigation */}
            <section className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm ">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blogs"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blogs
                        </Link>
                        <div className="flex items-center gap-4">
                            <ShareButton />
                            <LikeButton
                                blogId={blog.id}
                                initialLikes={blog.likes_count!}
                                initiallyLiked={initiallyLiked}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Article Header */}
                <article className="space-y-8">
                    <header className="text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                            {blog.title}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-pretty">
                            {blog.summary}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{blog.users.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{readingTime} min read</span>
                            </div>
                        </div>

                        <Badge
                            variant="secondary"
                            className="bg-secondary/20 text-secondary-foreground"
                        >
                            {readingTime} min read
                        </Badge>
                    </header>

                    {/* Featured Image */}
                    {blog.thumbnail_url && (
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                            <Image
                                src={
                                    `${blog.thumbnail_url}` ||
                                    "/placeholder.svg"
                                }
                                alt={`${blog.title}`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="text-lg leading-relaxed text-foreground space-y-6"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>

                    {/* Article Footer */}
                    <footer className="pt-8 border-t border-border">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <LikeButton
                                    blogId={blog.id}
                                    initialLikes={blog.likes_count!}
                                    initiallyLiked={initiallyLiked}
                                />
                                <ShareButton />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Last updated: {formatDate(blog.updatedAt)}
                            </div>
                        </div>
                    </footer>
                </article>

                {/* Author Bio Section */}
                <Card className="mt-12 p-8 bg-muted/50">
                    <div className="flex items-start gap-6">
                        <Avatar className="h-16 w-16 cursor-pointer rounded-full">
                            <AvatarImage
                                src={blog.users.image || ""}
                                alt={blog.users.name || "User"}
                            />
                            <AvatarFallback>
                                {blog.users.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                            <h3 className="text-xl font-semibold text-foreground">
                                {blog.users.name}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                A passionate writer sharing insights and
                                experiences through thoughtful articles. Follow
                                for more engaging content and discussions.
                            </p>
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm">
                                    Follow
                                </Button>
                                <Button variant="ghost" size="sm">
                                    View Profile
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Navigation */}
                <div className="mt-12 flex justify-center">
                    <Link href="/blogs">
                        <Button
                            variant="outline"
                            className="gap-2 bg-transparent"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to All Blogs
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default SingleBlogPage;
