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
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

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

    // TipTap editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Highlight,
            Link,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content: form.getValues("content"),
        onUpdate({ editor }) {
            form.setValue("content", editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose max-w-full focus:outline-none p-2 min-h-[150px] rounded-md",
            },
        },
        immediatelyRender: false,
    });

    async function onSubmit(values: BlogFormValues) {
        try {
            const payload = {
                ...values,
                author_id: session?.user?.id,
            };

            await axios.post("/api/blogs", payload);

            toast.success("Your blog has been created successfully!");
            form.reset();
            window.location.href = "/admin/dashboard/blogs";
        } catch (error: any) {
            console.error(
                "❌ Failed to create blog:",
                error.response?.data || error.message
            );
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

                {/* Thumbnail */}
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
                                    value={field.value ?? []}
                                    onChange={field.onChange}
                                    placeholder="Select one or more tags"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Create Blog
                </Button>
            </form>
        </Form>
    );
};

export default CreateBlogForm;

// Menu Bar Component
const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const btnClass =
        "px-2 py-1 border rounded-md hover:bg-gray-100 transition-colors";

    const activeClass = "bg-blue-100 text-blue-700 font-bold";

    return (
        <div className="flex flex-wrap gap-2 mb-2">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`${btnClass} ${
                    editor.isActive("bold") ? activeClass : ""
                }`}
            >
                B
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`${btnClass} ${
                    editor.isActive("italic") ? activeClass : ""
                }`}
            >
                I
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={btnClass}
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
                className={btnClass}
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
                className={btnClass}
            >
                Link
            </button>
        </div>
    );
};
