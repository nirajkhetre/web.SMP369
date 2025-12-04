import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SEO } from "@/components/seo";

export default function Terms() {
    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <SEO title="Terms & Conditions - 369-MC SMP" description="Read our Terms and Conditions." />
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
                    <p className="text-lg text-muted-foreground">Last updated: December 2024</p>
                </div>

                <Card className="bg-card/50 backdrop-blur border-primary/20">
                    <CardContent className="p-6 sm:p-8">
                        <ScrollArea className="h-[800px] pr-4">
                            <div className="space-y-8 text-muted-foreground">
                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                                    <p>
                                        By accessing and using the 369-MC SMP website and Minecraft server, you accept and agree to be bound by the terms and provision of this agreement.
                                        In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. Server Rules</h2>
                                    <p className="mb-4">To ensure a fair and enjoyable experience for all players, the following rules must be strictly adhered to:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>No use of hacked clients, cheat mods, or unfair advantages (X-ray, Fly, etc.).</li>
                                        <li>No griefing or stealing from claimed land.</li>
                                        <li>Respect all players and staff. No harassment, hate speech, or toxic behavior.</li>
                                        <li>No spamming or advertising other servers.</li>
                                        <li>Staff decisions are final. Appeals can be made via our Discord server.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">3. Purchases and Payments</h2>
                                    <p>
                                        All purchases on 369-MC SMP are for virtual items/ranks only. These items have no real-world value and cannot be exchanged for cash.
                                        Payments are processed securely via Razorpay. By making a purchase, you confirm that you are the authorized owner of the payment method used.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">4. Refund and Cancellation Policy</h2>
                                    <p className="mb-4">
                                        <strong>Strict No-Refund Policy:</strong> Due to the digital nature of our products (virtual items/ranks) which are instantly delivered and consumed upon purchase, we generally do not offer refunds.
                                    </p>
                                    <p className="mb-4">
                                        However, exceptions may be made in the following cases:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Non-Delivery:</strong> If you do not receive your purchased item within 24 hours of a successful transaction.</li>
                                        <li><strong>Technical Error:</strong> If a duplicate payment was made due to a technical glitch.</li>
                                    </ul>
                                    <p className="mt-4">
                                        To request a refund under these exceptions, please contact us at sargeomark@gmail.com within 48 hours of the transaction with your Transaction ID and Username.
                                        Chargebacks without prior contact will result in a permanent ban from the server.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">5. Limitation of Liability</h2>
                                    <p>
                                        369-MC SMP and its owners shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
                                        We reserve the right to modify or discontinue the service at any time without notice.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">6. Changes to Terms</h2>
                                    <p>
                                        We reserve the right to update or change our Terms and Conditions at any time. Your continued use of the service after we post any modifications to the Terms and Conditions on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Terms and Conditions.
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
