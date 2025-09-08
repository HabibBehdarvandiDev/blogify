import { BlogCountChart } from "@/components/shared/admin/charts/blog-count-chart";
import { BlogLikesChart } from "@/components/shared/admin/charts/blog-likes-chart";
import { BlogsPerAuthorChart } from "@/components/shared/admin/charts/blog-per-author-chart";
import { BlogsPerTagChart } from "@/components/shared/admin/charts/blogs-per-tag-chart";
import { ChartBlogStatus } from "@/components/shared/admin/charts/chart-blog-status";
import BlogPublishedChart from "../../../../components/shared/admin/charts/blog-published-chart";

const AdminDashboard = () => {
    return (
        <div className="flex flex-col gap-3">
                <BlogPublishedChart />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <BlogLikesChart />
                <BlogCountChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <ChartBlogStatus />
                <BlogsPerAuthorChart />
            </div>
            <BlogsPerTagChart />
        </div>
    );
};

export default AdminDashboard;
