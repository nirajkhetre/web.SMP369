import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { SEO } from "@/components/seo";

export default function Contact() {
    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <SEO title="Contact Us - 369-MC SMP" description="Get in touch with the 369-MC SMP team." />
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
                    <p className="text-lg text-muted-foreground">We're here to help!</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-colors">
                        <CardContent className="p-8 flex flex-col items-center text-center h-full">
                            <div className="p-4 bg-blue-500/10 rounded-full mb-6">
                                <Mail className="h-8 w-8 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground mb-2">Email Support</h2>
                            <p className="text-muted-foreground mb-6">
                                For business inquiries, payment issues, or formal appeals.
                            </p>
                            <a href="mailto:sargeomark@gmail.com" className="mt-auto">
                                <Button variant="outline" className="w-full">sargeomark@gmail.com</Button>
                            </a>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-colors">
                        <CardContent className="p-8 flex flex-col items-center text-center h-full">
                            <div className="p-4 bg-indigo-500/10 rounded-full mb-6">
                                <MessageSquare className="h-8 w-8 text-indigo-500" />
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground mb-2">Discord Community</h2>
                            <p className="text-muted-foreground mb-6">
                                The fastest way to get help. Open a ticket or ask in our support channels.
                            </p>
                            <a href="https://discord.gg/cMUbXXjh" target="_blank" rel="noopener noreferrer" className="mt-auto">
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Join Discord</Button>
                            </a>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12">
                    <Card className="bg-card/50 backdrop-blur border-primary/20">
                        <CardContent className="p-8 flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Registered Address</h3>
                                <p className="text-muted-foreground">
                                    369 Gaming
                                    <br />
                                    Digital Office, Cloud Region
                                    <br />
                                    India
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
