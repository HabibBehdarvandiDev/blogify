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
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import MultiSelectTags from "../../create/multi-select-tags";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Textarea } from "@/components/ui/textarea";

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
        defaultValues: {
            title: "",
            summary: "",
            content: "",
            thumbnail_url: "",
            status: "draft",
            tags: [],
        },
    });

    // Editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Highlight,
            Link,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content: initialData?.content || "",
        onUpdate({ editor }) {
            form.setValue("content", editor.getHTML());
        },
        editorProps: {
            attributes: { class: "prose max-w-full focus:outline-none" },
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        async function fetchBlog() {
            try {
                const res = await axios.get(`/api/blogs/${id}`);
                setInitialData(res.data);
                form.reset(res.data); // populate form with fetched data
                editor?.commands.setContent(res.data.content || ""); // set editor content
            } catch (err: any) {
                toast.error("Failed to load blog data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [id, editor]);

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
                    render={() => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <div className="space-y-2">
                                    <MenuBar editor={editor} />
                                    <div className="border rounded-md min-h-[150px]">
                                        <EditorContent
                                            editor={editor}
                                            className="p-2"
                                        />
                                    </div>
                                </div>
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

                {/* Tags */}
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
                                    value={field.value ?? []}
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

// MenuBar component
const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    return (
        <div className="flex gap-2 mb-2">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={
                    editor.isActive("bold") ? "font-bold text-blue-500" : ""
                }
            >
                B
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={
                    editor.isActive("italic") ? "italic text-blue-500" : ""
                }
            >
                I
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
            >
                Highlight
            </button>
            <button
                type="button"
                onClick={() => {
                    const url = prompt("Enter image URL");
                    if (url)
                        editor.chain().focus().setImage({ src: url }).run();
                }}
            >
                Image
            </button>
            <button
                type="button"
                onClick={() => {
                    const url = prompt("Enter link URL");
                    if (url)
                        editor.chain().focus().setLink({ href: url }).run();
                }}
            >
                Link
            </button>
        </div>
    );
};
