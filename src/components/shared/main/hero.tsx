import React from "react";
import prisma from "@/lib/db";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    StarIcon,
    ArrowRight,
    BookOpen,
    Users,
    TrendingUp,
} from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-card/50 to-secondary/10 py-24 lg:py-32 px-4">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="container mx-auto max-w-7xl relative">
                <div className="text-center space-y-12">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full border border-[#DDDDDD] dark:border-[#333333] mb-6">
                            <StarIcon className="h-4 w-4 text-foreground" />
                            <span className="text-sm font-medium text-foreground">
                                Join 50,000+ writers worldwide
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance leading-tight">
                            <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                                Unleash Your
                            </span>
                            <br />
                            <span className="text-foreground">Voice</span>
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground text-pretty max-w-4xl mx-auto leading-relaxed">
                            Join Blogify, where writers and readers connect
                            through powerful storytelling. Discover amazing
                            content and share your unique perspective with the
                            world.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button size="lg" asChild>
                            <Link href={"/register"}>
                                Join Blogify Now
                                <ArrowRight className="ml-3 h-6 w-6" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <Link href={"/blogs"}>
                                Explore Articles
                                <ArrowRight className="ml-3 h-6 w-6" />
                            </Link>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
                        <div className="text-center group hover:scale-105 transition-transform duration-300 p-6 rounded-2xl hover:bg-card/50">
                            <div className="flex items-center justify-center mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 mx-auto group-hover:bg-primary/20 transition-colors">
                                <BookOpen className="h-8 w-8 text-foreground" />
                            </div>
                            <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                                1,200+
                            </div>
                            <div className="text-base text-muted-foreground font-medium">
                                Articles Published
                            </div>
                        </div>
                        <div className="text-center group hover:scale-105 transition-transform duration-300 p-6 rounded-2xl hover:bg-card/50">
                            <div className="flex items-center justify-center mb-4 p-3 bg-secondary/10 rounded-full w-16 h-16 mx-auto group-hover:bg-secondary/20 transition-colors">
                                <Users className="h-8 w-8 text-foreground" />
                            </div>
                            <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                                5,000+
                            </div>
                            <div className="text-base text-muted-foreground font-medium">
                                Active Writers
                            </div>
                        </div>
                        <div className="text-center group hover:scale-105 transition-transform duration-300 p-6 rounded-2xl hover:bg-card/50">
                            <div className="flex items-center justify-center mb-4 p-3 bg-accent/10 rounded-full w-16 h-16 mx-auto group-hover:bg-accent/20 transition-colors">
                                <TrendingUp className="h-8 w-8 text-foreground" />
                            </div>
                            <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                                50K+
                            </div>
                            <div className="text-base text-muted-foreground font-medium">
                                Monthly Readers
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
