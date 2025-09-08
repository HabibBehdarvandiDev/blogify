import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-foreground mb-4">
                            Contact
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Get in touch with our team. We&apos;d love to hear
                            from you.
                        </p>
                    </div>

                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold text-foreground">
                                Send us a message
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                {/* Name + Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium mb-2"
                                        >
                                            Name
                                        </label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium mb-2"
                                        >
                                            Email
                                        </label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium mb-2"
                                    >
                                        Subject
                                    </label>
                                    <Input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="What's this about?"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium mb-2"
                                    >
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                {/* Submit */}
                                <Button type="submit" className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="mt-12 text-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="font-semibold mb-2">Email</h3>
                                <p className="text-muted-foreground text-sm">
                                    habibbehdarvandi.dev@gmail.com
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Phone</h3>
                                <p className="text-muted-foreground text-sm">
                                    +98 930 668 8810
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Address</h3>
                                <p className="text-muted-foreground text-sm">
                                    14, Sarvestan St
                                    <br />
                                    Pardis, Tehran
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
