import Link from "next/link";
import React from "react";

const IntroSection = () => {
    return (
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                Blogify.
            </h1>
            <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
                A blog Platform using{" "}
                <a
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-orange-500 duration-200 transition-colors"
                >
                    NextJS
                </a>{" "}
                made by{" "}
                <Link
                    href={"https://github.com/HabibBehdarvandiDev"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-orange-500 duration-200 transition-colors"
                >
                    Habib.Dev
                </Link>
                .
            </h2>
        </section>
    );
};

export default IntroSection;
