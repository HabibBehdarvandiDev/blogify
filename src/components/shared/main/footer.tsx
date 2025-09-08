import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-muted/50 backdrop-blur-sm py-16 lg:py-20 px-4 border-t border-[#DDDDDD] dark:border-[#333333]">
            <div className="container mx-auto max-w-7xl">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-foreground">
                            Blogify
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Empowering writers and readers to connect through
                            powerful storytelling and meaningful conversations.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-foreground">
                            Platform
                        </h4>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    Write
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    Read
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    Discover
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    Community
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-foreground">
                            Company
                        </h4>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    Press
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-foreground">
                            Support
                        </h4>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors duration-300 text-base"
                                >
                                    Guidelines
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#DDDDDD] dark:border-[#333333] mt-12 pt-8 text-center text-base text-muted-foreground">
                    <p>
                        &copy; 2025 Blogify. All rights reserved. Made with ❤️
                        by{" "}
                        <Link href={"https://github.com/HabibBehdarvandiDev"}>
                            Habib.Dev
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
