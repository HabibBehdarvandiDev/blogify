"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BlogFormSchema } from "@/schemas/blogs";
import { zodResolver } from "@hookform/resolvers/zod";
import { tags } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import z from "zod";
import MultiSelectTags from "./multi-select-tags";
import { toast } from "sonner";

type BlogFormValues = z.infer<typeof BlogFormSchema>;

const CreateBlogForm = ({ tags }: { tags: tags[] }) => {
    const { data: session, status } = useSession();

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(BlogFormSchema),
        defaultValues: {
            title: "",
            summary: "",
            content: "",
            thumbnail_url: undefined,
            status: "draft",
            author_id: undefined,
            likes_count: 0,
            tags: [],
        },
    });
    console.log(session?.user.id);

    async function onSubmit(values: BlogFormValues) {
        try {
            // ✅ Merge author_id from session
            const payload = {
                ...values,
                author_id: session?.user?.id,
            };

            const res = await axios.post("/api/blogs", payload);

            // ✅ Success toast
            toast.success("Your blog has been created successfully!");
            form.reset();

            // redirect to /admin/dashboard/blogs
            window.location.href = "/admin/dashboard/blogs";
        } catch (error: any) {
            console.error(
                "❌ Failed to create blog:",
                error.response?.data || error.message
            );

            // ✅ Error toast
            toast.error("Failed to create blog. Check console for details.");
        }
    }

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>Not signed in</p>;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter blog title"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Summary */}
                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Short summary of the blog"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Content */}
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Full blog content"
                                    className="min-h-[150px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Thumbnail URL */}
                <FormField
                    control={form.control}
                    name="thumbnail_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thumbnail URL</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://example.com/image.jpg"
                                    value={field.value ?? ""} // show empty string in UI
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.value || undefined
                                        )
                                    } // send undefined if empty
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Status */}
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">
                                        Published
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Tags */}
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <MultiSelectTags
                                    options={tags.map((t) => ({
                                        label: t.name,
                                        value: t.id,
                                    }))}
                                    value={field.value ?? []} // 👈 fallback to []
                                    onChange={field.onChange}
                                    placeholder="Select one or more tags"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit */}
                <Button type="submit" className="w-full">
                    Create Blog
                </Button>
            </form>
        </Form>
    );
};

export default CreateBlogForm;
