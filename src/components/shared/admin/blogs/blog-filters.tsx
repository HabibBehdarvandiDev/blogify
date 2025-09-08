"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterXIcon, SearchIcon } from "lucide-react";

type Props = {
    search: string;
    setSearch: (v: string) => void;
    status: string;
    setStatus: (v: string) => void;
    time: string;
    setTime: (v: string) => void;
    clearFilters: () => void;
};

const BlogFilters = ({
    search,
    setSearch,
    status,
    setStatus,
    time,
    setTime,
    clearFilters,
}: Props) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-65" />
                <Input
                    placeholder="Search blogs by title or summary..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            <div className="flex items-center gap-2">
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="this-week">This Week</SelectItem>
                        <SelectItem value="this-month">This Month</SelectItem>
                        <SelectItem value="this-year">This Year</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    size="icon"
                    variant="secondary"
                    onClick={clearFilters}
                    disabled={
                        search === "" && status === "all" && time === "all"
                    }
                >
                    <FilterXIcon />
                </Button>
            </div>
        </div>
    );
};

export default BlogFilters;
