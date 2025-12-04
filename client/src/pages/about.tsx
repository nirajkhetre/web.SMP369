import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart } from "lucide-react";
import { SEO } from "@/components/seo";

export default function About() {
    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <SEO title="About Us - 369-MC SMP" description="Learn more about the team behind 369-MC SMP." />
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">About Us</h1>
                    <p className="text-lg text-muted-foreground">The story behind 369-MC SMP</p>
                </div>

                <div className="space-y-8">
                    <Card className="bg-card/50 backdrop-blur border-primary/20">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Users className="h-6 w-6 text-primary" />
                                        <h2 className="text-2xl font-semibold text-foreground">Who We Are</h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        369-MC SMP is a passion project founded by <strong>369 Gaming</strong>. We are a team of dedicated Minecraft enthusiasts who wanted to create a server that balances the classic survival feel with modern, exciting features.
                                        Our team consists of experienced developers, builders, and community managers who work tirelessly to ensure a lag-free and enjoyable experience for everyone.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/20">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Target className="h-6 w-6 text-primary" />
                                        <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Our mission is simple: <strong>To provide the best possible Survival Multiplayer experience.</strong>
                                        We believe in fair play, community-driven development, and transparency. We don't believe in "pay-to-win" mechanics that ruin the fun. That's why our shop is focused on cosmetics and quality-of-life improvements, ensuring that skill and dedication are the only ways to reach the top.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/20">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Heart className="h-6 w-6 text-primary" />
                                        <h2 className="text-2xl font-semibold text-foreground">Why 369?</h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        The number 369 represents harmony and community. We strive to build a server where players from all over the world can come together, make friends, and build amazing things.
                                        Whether you're a redstone engineer, a master builder, or an explorer, there's a place for you here at 369-MC SMP.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
