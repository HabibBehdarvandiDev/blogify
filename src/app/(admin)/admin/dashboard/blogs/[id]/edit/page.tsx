"use client";

import { BlogUpdateSchema } from "@/schemas/blogs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MultiSelectTags from "../../create/multi-select-tags";

type Props = {
    params: { id: string };
};

type BlogFormValues = z.infer<typeof BlogUpdateSchema>;

const availableTags = [
    { id: "1", name: "Tech" },
    { id: "2", name: "Programming" },
    { id: "3", name: "React" },
    { id: "4", name: "Next.js" },
]; // replace with your fetched tags if needed

const BlogEditPage = ({ params }: Props) => {
    const router = useRouter();
    const { id } = params;
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState<BlogFormValues | null>(null);

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(BlogUpdateSchema),
        defaultValues: initialData || {
            title: "",
            summary: "",
            content: "",
            thumbnail_url: "",
            status: "draft",
            tags: [],
        },
    });

    useEffect(() => {
        async function fetchBlog() {
            try {
                const res = await axios.get(`/api/blogs/${id}`);
                setInitialData(res.data);
                form.reset(res.data); // populate form with fetched data
            } catch (err: any) {
                toast.error("Failed to load blog data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [id]);

    async function onSubmit(values: BlogFormValues) {
        try {
            const res = await axios.put(`/api/blogs/${id}`, values);
            toast.success("Blog updated successfully!");
            router.push("/admin/dashboard/blogs");
        } catch (err: any) {
            toast.error("Failed to update blog. Check console.");
            console.error(err);
        }
    }

    if (loading) return <p>Loading blog...</p>;

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
                                <Input placeholder="Blog title" {...field} />
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
                                    placeholder="Short summary"
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
                                    value={field.value ?? ""}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.value || undefined
                                        )
                                    }
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
                                value={field.value}
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

                {/* Tags with MultiSelectTags */}
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <MultiSelectTags
                                    options={availableTags.map((t) => ({
                                        label: t.name,
                                        value: t.id,
                                    }))}
                                    value={field.value ?? []} // fallback to []
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
                    Update Blog
                </Button>
            </form>
        </Form>
    );
};

export default BlogEditPage;
