import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SEO } from "@/components/seo";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <SEO title="Privacy Policy - 369-MC SMP" description="Read our Privacy Policy." />
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
                    <p className="text-lg text-muted-foreground">Last updated: December 2024</p>
                </div>

                <Card className="bg-card/50 backdrop-blur border-primary/20">
                    <CardContent className="p-6 sm:p-8">
                        <ScrollArea className="h-[800px] pr-4">
                            <div className="space-y-8 text-muted-foreground">
                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                                    <p>
                                        Welcome to 369-MC SMP ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
                                        This privacy policy will inform you as to how we look after your personal data when you visit our website (play.smp369.online)
                                        and tell you about your privacy rights and how the law protects you.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. Data We Collect</h2>
                                    <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Identity Data:</strong> Includes Minecraft username, Discord username (if linked).</li>
                                        <li><strong>Contact Data:</strong> Includes email address (if provided for support).</li>
                                        <li><strong>Transaction Data:</strong> Includes details about payments to and from you and other details of products and services you have purchased from us. Note: We do not store your credit card or bank account details. All payments are processed securely by Razorpay.</li>
                                        <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Data</h2>
                                    <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>To process your in-game purchases and deliver items/ranks.</li>
                                        <li>To manage our relationship with you (e.g., support requests).</li>
                                        <li>To improve our website, server, and player experience.</li>
                                        <li>To comply with a legal or regulatory obligation.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
                                    <p>
                                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                                        In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">5. Third-Party Links</h2>
                                    <p>
                                        This website may include links to third-party websites, plug-ins and applications (such as Razorpay for payments). Clicking on those links or enabling those connections may allow third parties to collect or share data about you.
                                        We do not control these third-party websites and are not responsible for their privacy statements.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">6. Advertising Partners</h2>
                                    <p className="mb-4">
                                        We may use third-party advertising companies (such as Google AdSense) to serve ads when you visit our website. These companies may use cookies and other tracking technologies to collect information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
                                        <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                                        <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a>.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
                                    <p>
                                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                                        <br /><br />
                                        Email: sargeomark@gmail.com
                                        <br />
                                        Discord: https://discord.gg/cMUbXXjh
                                    </p>
                                </section>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
