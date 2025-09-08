import HeroSection from "@/components/shared/main/hero";
import IntroSection from "@/components/shared/main/intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import {
    ArrowRight,
    BookOpen,
    Calendar,
    Clock,
    Mail,
    StarIcon,
    TrendingUp,
    User,
    Users,
} from "lucide-react";
import Image from "next/image";
import prisma from "@/lib/db";
import Link from "next/link";
import { NewsletterSignup } from "@/components/shared/newsletter-signup";
import Footer from "@/components/shared/main/footer";
import RegisterCtaSection from "@/components/shared/main/register-cta-section";

export default async function Home() {
    // fetch latest blogs
    const blogs = await prisma.blogs.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            summary: true,
            thumbnail_url: true,
            content: true,
            createdAt: true,
            users: {
                select: { id: true, name: true },
            },
        },
    });

    return (
        <div className="min-h-screen bg-background px-4">
            {/* Hero Section */}
            <HeroSection />

            {/* Latest Blogs Section */}
            <section className="py-24 lg:py-32 px-4 bg-gradient-to-b from-background to-card/30">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full border border-[#DDDDDD] dark:border-[#333333] mb-6">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">
                                Fresh Content
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                            Latest Articles
                        </h2>
                        <p className="text-xl md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
                            Discover fresh insights and perspectives from our
                            community of talented writers
                        </p>
                    </div>

                    {blogs.length > 0 && (
                        <>
                            {/* Featured Article */}
                            <div className="mb-16">
                                <Card className="overflow-hidden transition-all duration-500  bg-card/80 backdrop-blur-sm group hover:scale-[1.001]">
                                    <div className="md:flex">
                                        <div className="md:w-1/2 relative overflow-hidden">
                                            <Image
                                                src={
                                                    blogs[0].thumbnail_url ||
                                                    "/placeholder.svg?height=400&width=600&query=blog thumbnail"
                                                }
                                                alt={blogs[0].title}
                                                className="w-full h-80 md:h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-r-xl"
                                                width={600}
                                                height={400}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="md:w-1/2 p-10 lg:p-12">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Badge
                                                    variant="secondary"
                                                    className="flex items-center gap-2 px-3 py-2"
                                                >
                                                    <StarIcon className="h-3 w-3 mr-1" />
                                                    Featured
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="flex items-center gap-2 px-3 py-2"
                                                >
                                                    <Clock className="h-3 w-3" />
                                                    {calculateReadingTime(
                                                        blogs[0].content
                                                    )}{" "}
                                                    min read
                                                </Badge>
                                            </div>
                                            <h3 className="text-3xl lg:text-2xl font-bold text-foreground mb-6 text-balance leading-tight group-hover:text-primary transition-colors duration-300">
                                                {blogs[0].title}
                                            </h3>
                                            <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
                                                {blogs[0].summary}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-6 text-base text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-5 w-5" />
                                                        <span className="font-medium">
                                                            {
                                                                blogs[0].users
                                                                    .name
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-5 w-5" />
                                                        {formatDate(
                                                            blogs[0].createdAt.toISOString()
                                                        )}
                                                    </div>
                                                </div>
                                                <Button variant="ghost" asChild>
                                                    <Link
                                                        href={`/blogs/${blogs[0].id}`}
                                                    >
                                                        Read More
                                                        <ArrowRight className="ml-2 h-5 w-5" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Article Grid */}
                            <div className="grid md:grid-cols-2 gap-10">
                                {blogs.slice(1).map((blog) => (
                                    <Card
                                        key={blog.id}
                                        className="overflow-hidden transition-all duration-500 group  bg-card/80 backdrop-blur-sm hover:scale-105"
                                    >
                                        <div className="aspect-video overflow-hidden relative">
                                            <Image
                                                src={
                                                    blog.thumbnail_url ||
                                                    "/placeholder.svg?height=300&width=500&query=blog thumbnail"
                                                }
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                width={500}
                                                height={300}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <CardHeader className="p-8">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Badge
                                                    variant="outline"
                                                    className="flex items-center gap-2 px-3 py-1"
                                                >
                                                    <Clock className="h-3 w-3" />
                                                    {calculateReadingTime(
                                                        blog.content
                                                    )}{" "}
                                                    min read
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-2xl text-balance group-hover:text-primary transition-colors duration-300 leading-tight mb-3">
                                                {blog.title}
                                            </CardTitle>
                                            <CardDescription className="text-pretty text-lg leading-relaxed">
                                                {blog.summary}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-8 pt-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        <span className="font-medium">
                                                            {blog.users.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatDate(
                                                            blog.createdAt.toISOString()
                                                        )}
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/blogs/${blog.id}`}
                                                    >
                                                        Read More
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </>
                    )}

                    {blogs.length === 0 && (
                        <div className="text-center py-20">
                            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-foreground mb-4">
                                No Articles Yet
                            </h3>
                            <p className="text-lg text-muted-foreground">
                                Be the first to share your story with the world!
                            </p>
                        </div>
                    )}

                    <div className="text-center mt-16">
                        <Button variant="outline" size="lg" asChild>
                            <Link href={"/blogs"}>
                                View All Articles
                                <ArrowRight className="ml-3 h-6 w-6" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <RegisterCtaSection />

            <Footer />
        </div>
    );
}
