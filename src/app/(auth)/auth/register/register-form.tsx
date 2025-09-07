"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormSchema } from "@/schemas/auth/register";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

const RegisterForm = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: RegisterFormValues) {
        setIsLoading(true);

        try {
            const { data } = await axios.post("/api/auth/register", values);

            // ✅ Success
            toast.success("Account created successfully! You can now log in.");

            form.reset();
            signIn("credentials", {
                email: values.email,
                password: values.password,
                callbackUrl: "/",
            });
        } catch (err: any) {
            // Axios errors
            if (axios.isAxiosError(err)) {
                const res = err.response;

                if (!res) {
                    toast.error("Network error. Please try again.");
                    return;
                }

                switch (res.status) {
                    case 422: // Validation errors
                        res.data.errors?.forEach((error: any) => {
                            toast.error(`${error.path[0]}: ${error.message}`);
                        });
                        break;

                    case 409: // Email already in use
                        toast.error(
                            "Email already in use. Please login instead."
                        );
                        break;

                    default: // Other errors
                        toast.error(res.data.message || "Something went wrong");
                        break;
                }
            } else {
                console.error("Unexpected error:", err);
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* NAME */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Name<span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="John Doe"
                                    className="h-12"
                                    {...field}
                                    aria-required="true"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* EMAIL */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email<span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="mail@loopple.com"
                                    className="h-12"
                                    {...field}
                                    aria-required="true"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* PASSWORD */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Password
                                <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter a password"
                                    className="h-12"
                                    {...field}
                                    aria-required="true"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/*  FORGOT PASSWORD */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/auth/forgot-password"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* SUBMIT */}
                <Button
                    type="submit"
                    className="w-full h-12 font-medium"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Sign Up"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
