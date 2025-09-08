import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import React from "react";
import { NewsletterSignup } from "../newsletter-signup";
import Link from "next/link";

const RegisterCtaSection = () => {
    return (
        <section className="py-24 lg:py-32 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="container mx-auto max-w-5xl text-center relative">
                <div className="space-y-12">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DDDDDD] dark:border-[#333333] mb-6">
                            <Mail className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">
                                Join Our Community
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
                            Ready to Share Your Story?
                        </h2>
                        <p className="text-lg md:text-2xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
                            Join thousands of writers who trust Blogify to
                            amplify their voice. Start writing, connect with
                            readers, and build your audience today.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button size="lg" asChild>
                            <Link
                                href={"/register"}
                            >
                                Start Writing Today
                                <ArrowRight className="ml-3 h-6 w-6" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg">
                            Learn More
                        </Button>
                    </div>

                    {/* Newsletter Signup */}
                    <NewsletterSignup />
                </div>
            </div>
        </section>
    );
};

export default RegisterCtaSection;
