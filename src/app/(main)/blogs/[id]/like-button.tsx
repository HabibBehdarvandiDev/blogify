"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

type LikeButtonProps = {
    blogId: string;
    initialLikes: number;
    initiallyLiked?: boolean;
};

const LikeButton = ({
    blogId,
    initialLikes,
    initiallyLiked = false,
}: LikeButtonProps) => {
    const { data: session } = useSession();
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(initiallyLiked);
    const [isPending, startTransition] = useTransition();

    const handleClick = async () => {
        if (!session) {
            // redirect user to login if not authenticated
            signIn();
            return;
        }

        // optimistic UI update
        setLiked(!liked);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));

        startTransition(async () => {
            try {
                const res = await fetch(`/api/blogs/${blogId}/like`, {
                    method: "PUT",
                });

                if (!res.ok) {
                    throw new Error("Failed to toggle like");
                }

                const data = await res.json();

                // sync with server
                setLiked(data.liked);
                setLikes(data.likes_count);
            } catch (err) {
                console.error("Error toggling like:", err);
                // rollback optimistic update if error
                setLiked(liked);
                setLikes((prev) => (liked ? prev + 1 : prev - 1));
            }
        });
    };

    return (
        <Button
            variant={liked ? "default" : "outline"}
            size="sm"
            onClick={handleClick}
            disabled={isPending}
        >
            <Heart
                className={`h-4 w-4 mr-2 ${
                    liked ? "fill-red-500 text-red-500" : ""
                }`}
            />
            {liked ? "Unlike" : "Like"} ({likes})
        </Button>
    );
};

export default LikeButton;
