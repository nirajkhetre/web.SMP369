import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, ShoppingCart, Laptop, Smartphone } from "lucide-react";
import { SiRazorpay } from "react-icons/si";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export function ShopSection() {
    const [username, setUsername] = useState("");
    const [platform, setPlatform] = useState<"java" | "bedrock">("java");
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = async () => {
        if (!username) {
            toast({
                title: "Username required",
                description: "Please enter your username to continue.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            // Format username based on platform
            let finalUsername = username;
            if (platform === "bedrock") {
                if (!finalUsername.startsWith(".")) {
                    finalUsername = "." + finalUsername;
                }
            }

            // SIMULATION MODE: Bypass Razorpay and call Lambda via backend proxy
            const mockPaymentId = "simulated_pay_" + Date.now();
            const mockOrderId = "simulated_order_" + Date.now();

            const response = await fetch("/api/simulate-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: finalUsername,
                    rank: "Rank Unlocker",
                    orderId: mockOrderId,
                    paymentId: mockPaymentId,
                    amount: 49,
                }),
            });

            if (response.ok) {
                setPaymentSuccess(true);
                toast({
                    title: "Payment Successful!",
                    description: `Rank Unlocker activated for ${finalUsername}`,
                });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update rank");
            }
        } catch (error: any) {
            console.error("Payment Error:", error);
            toast({
                title: "Error",
                description: error.message || "Something went wrong processing the payment.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (paymentSuccess) {
        return (
            <section id="shop" className="py-16 md:py-24 bg-black/40 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:pr-72 relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-green-500/20 rounded-md">
                            <ShoppingCart className="h-6 w-6 text-green-500" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold">Rank Shop</h2>
                    </div>

                    <Card className="max-w-md mx-auto border-green-500/20 bg-green-500/10 backdrop-blur">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                                <CheckCircle2 className="h-8 w-8 text-green-500" />
                            </div>
                            <CardTitle className="text-2xl text-green-500">Purchase Successful!</CardTitle>
                            <CardDescription className="text-gray-400">
                                Thank you! Your Rank Unlocker has been activated.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="justify-center">
                            <Button
                                variant="outline"
                                className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                                onClick={() => {
                                    setPaymentSuccess(false);
                                    setUsername("");
                                }}
                            >
                                Buy Another
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        );
    }

    return (
        <section id="shop" className="py-16 md:py-24 bg-black/40 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 lg:pr-72 relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-blue-500/20 rounded-md">
                        <ShoppingCart className="h-6 w-6 text-blue-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">Rank Shop</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Product Info */}
                    <div className="space-y-6">
                        <div className="relative w-full h-auto rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50 group">
                            <img
                                src="/RankUnlocker.png"
                                alt="Rank Unlocker"
                                className="w-full h-auto p-4 transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20">
                                    Best Value
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white">Rank Unlocker <span className="text-blue-500">One-Time</span></h3>
                            <p className="text-zinc-400 leading-relaxed">
                                Purchase the <strong>Rank Unlocker</strong> to instantly unlock the <strong>Novice</strong> rank.
                                From there, your journey is in your hands! Complete in-game tasks, mine ores, and play to reach the top ranks.
                                <br /><br />
                                <span className="text-sm italic text-zinc-500">Note: This is not pay-to-win. You buy the entry ticket, but you earn the glory.</span>
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    "Unlocks Novice Rank",
                                    "Start Your Journey",
                                    "Fair Progression System",
                                    "Support the Server",
                                    "One-Time Purchase",
                                    "Instant Activation"
                                ].map((perk, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                                        <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                        <span>{perk}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Purchase Card */}
                    <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl h-full">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-white">Complete Purchase</CardTitle>
                            <CardDescription className="text-zinc-400">
                                Select your platform and enter your username
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            <Tabs defaultValue="java" className="w-full" onValueChange={(val) => setPlatform(val as "java" | "bedrock")}>
                                <TabsList className="grid w-full grid-cols-2 bg-black/40">
                                    <TabsTrigger value="java" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                                        <Laptop className="w-4 h-4 mr-2" />
                                        Java Edition
                                    </TabsTrigger>
                                    <TabsTrigger value="bedrock" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                                        <Smartphone className="w-4 h-4 mr-2" />
                                        Bedrock Edition
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>

                            <div className="space-y-2">
                                <Label htmlFor="shop-username" className="text-zinc-200">
                                    {platform === "java" ? "Minecraft Username" : "Xbox Gamertag"}
                                </Label>
                                <div className="relative">
                                    {platform === "bedrock" && (
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono">.</div>
                                    )}
                                    <Input
                                        id="shop-username"
                                        placeholder={platform === "java" ? "Steve" : "Alex"}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={`border-zinc-800 bg-black/40 text-white placeholder:text-zinc-600 focus:border-blue-500 h-12 ${platform === "bedrock" ? "pl-6" : ""}`}
                                    />
                                </div>
                                {platform === "bedrock" && (
                                    <p className="text-xs text-zinc-500">
                                        We'll automatically add the <span className="font-mono text-green-500">.</span> prefix for Bedrock players.
                                    </p>
                                )}
                            </div>

                            <div className="pt-4 border-t border-zinc-800">
                                <div className="flex justify-between items-center mb-4 text-sm">
                                    <span className="text-zinc-400">Subtotal</span>
                                    <span className="text-white">₹49.00</span>
                                </div>
                                <div className="flex justify-between items-center mb-6 text-lg font-bold">
                                    <span className="text-white">Total</span>
                                    <span className="text-blue-400">₹49.00</span>
                                </div>

                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg shadow-lg shadow-blue-900/20"
                                    onClick={handlePayment}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <SiRazorpay className="mr-2 h-5 w-5" />
                                            Pay ₹49
                                        </>
                                    )}
                                </Button>
                                <p className="text-xs text-center text-zinc-500 mt-4">
                                    Secure payment via Razorpay. Instant activation.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
