import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { blogPosts } from "@/lib/blog-data";
import { SEO } from "@/components/seo";

export default function Blog() {
    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <SEO
                title="Blog - 369-MC SMP"
                description="Latest news, updates, and guides from the 369-MC SMP team."
            />
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">369-MC SMP Blog</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Latest news, guides, and updates from the world of 369-MC SMP.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Card key={post.slug} className="flex flex-col hover:border-primary/50 transition-colors bg-card/50 backdrop-blur">
                            <CardHeader>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {post.readTime}
                                    </div>
                                </div>
                                <CardTitle className="text-2xl font-bold leading-tight mb-2 line-clamp-2">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                        {post.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    {post.author}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link href={`/blog/${post.slug}`} className="w-full">
                                    <Button className="w-full group">
                                        Read Article
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
