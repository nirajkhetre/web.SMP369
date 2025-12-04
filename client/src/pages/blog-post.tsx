import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Link } from "wouter";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { SEO } from "@/components/seo";

export default function BlogPost() {
    const [match, params] = useRoute("/blog/:slug");
    const slug = params?.slug;

    const { data: post, isLoading } = useQuery({
        queryKey: ["blogPost", slug],
        queryFn: () => getBlogPost(slug || ""),
        enabled: !!slug,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pt-20 pb-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Skeleton className="h-8 w-32 mb-8" />
                    <Skeleton className="h-12 w-3/4 mb-4 mx-auto" />
                    <div className="flex justify-center gap-4 mb-8">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-background pt-20 pb-12 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
                <Link href="/blog">
                    <Button>Back to Blog</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <SEO
                title={`${post.title} - 369-MC SMP Blog`}
                description={post.excerpt}
                type="article"
                author={post.author}
                date={post.date}
                image={post.image}
            />

            <article className="container mx-auto px-4 max-w-3xl">
                <Link href="/blog">
                    <Button variant="ghost" className="mb-8 hover:bg-primary/10 group">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Button>
                </Link>

                <div className="space-y-6 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            <span className="font-medium">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </div>

                <Card className="bg-card/50 backdrop-blur border-primary/20 overflow-hidden">
                    <CardContent className="p-8 md:p-12">
                        <div
                            className="prose prose-invert prose-lg max-w-none prose-headings:text-primary prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-white"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </CardContent>
                </Card>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-4">Enjoyed this article? Share it with your friends!</p>
                    <Button variant="outline" className="gap-2" onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                    }}>
                        <Share2 className="h-4 w-4" />
                        Copy Link
                    </Button>
                </div>
            </article>
        </div>
    );
}
