import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-zinc-950 h-max min-h-[100vh] pb-5">
            <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
                <Link className="mt-10 w-fit text-white" href="/">
                    <div className="flex w-fit items-center lg:pl-0 lg:pt-0 xl:pt-0">
                        <ChevronLeftIcon className="w-4 h-4" />
                        <p className="ml-0 text-sm text-white">
                            Back to the website
                        </p>
                    </div>
                </Link>
                <div className="my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
                    <p className="text-[32px] font-bold text-white">Sign In</p>
                    <p className="mb-2.5 mt-2.5 font-normal text-zinc-400">
                        Enter your email and password to sign in!
                    </p>
                    <div className="mt-8">
                        <form className="pb-2">
                            <input
                                type="hidden"
                                name="provider"
                                value="google"
                            />
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-800 bg-none hover:bg-accent hover:text-accent-foreground h-10 px-4 w-full text-white py-6"
                                type="submit"
                            >
                                <span className="mr-2">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        stroke-width="0"
                                        version="1.1"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 48 48"
                                        enable-background="new 0 0 48 48"
                                        className="h-5 w-5"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="#FFC107"
                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                        ></path>
                                        <path
                                            fill="#FF3D00"
                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                        ></path>
                                        <path
                                            fill="#4CAF50"
                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                        ></path>
                                        <path
                                            fill="#1976D2"
                                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                        ></path>
                                    </svg>
                                </span>
                                <span>Google</span>
                            </button>
                        </form>
                    </div>
                    <div className="relative my-4">
                        <div className="relative flex items-center py-1">
                            <div className="grow border-t border-zinc-800"></div>
                            <div className="grow border-t border-zinc-800"></div>
                        </div>
                    </div>
                    <div>
                        <form className="mb-4">
                            <div className="grid gap-2">
                                <div className="grid gap-1">
                                    <label className="text-white">Email</label>
                                    <input
                                        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-white border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        name="email"
                                    />
                                    <label className="text-zinc-950 mt-2 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        placeholder="Password"
                                        type="password"
                                        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-white border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                                        name="password"
                                    />
                                </div>
                                <button
                                    className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-950 hover:bg-white/90 active:bg-white/80 flex w-full max-w-full mt-6 items-center justify-center rounded-lg px-4 py-4 text-base font-medium"
                                    type="submit"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <p>
                            <a
                                href="/dashboard/signin/forgot_password"
                                className="font-medium text-white text-sm"
                            >
                                Forgot your password?
                            </a>
                        </p>
                        <p>
                            <a
                                href="/dashboard/signin/email_signin"
                                className="font-medium text-white text-sm"
                            >
                                Sign in via magic link
                            </a>
                        </p>
                        <p>
                            <a
                                href="/dashboard/signin/signup"
                                className="font-medium text-white text-sm"
                            >
                                Don&apos;t have an account? Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
