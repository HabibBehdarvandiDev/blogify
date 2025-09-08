"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

// ✅ Validation schema
const TagFormSchema = z.object({
    name: z.string().min(1, "Tag name is required"),
    description: z.string().optional(),
});

type TagFormValues = z.infer<typeof TagFormSchema>;

const CreateTagModal = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const form = useForm<TagFormValues>({
        resolver: zodResolver(TagFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    async function onSubmit(values: TagFormValues) {
        try {
            await axios.post("/api/tags", values);

            toast.success("Tag created successfully!");

            setOpen(false); // close dialog
            
            form.reset(); // clear form
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to create tag. Check console.");
            alert("Failed to create tag.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="w-4 h-4" />
                    <span className="hidden md:block ml-1">Create New Tag</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Tag</DialogTitle>
                    <DialogDescription>
                        Enter the tag details below and click save.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter tag name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Description (optional)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTagModal;
