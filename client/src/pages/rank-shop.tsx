import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";
import { SiRazorpay } from "react-icons/si";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function RankShop() {
    const [username, setUsername] = useState("");
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
            // SIMULATION MODE: Bypass Razorpay and call Lambda via backend proxy
            const mockPaymentId = "simulated_pay_" + Date.now();
            const mockOrderId = "simulated_order_" + Date.now();

            const response = await fetch("/api/simulate-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    rank: "VIP",
                    orderId: mockOrderId,
                    paymentId: mockPaymentId,
                    amount: 99,
                }),
            });

            const responseText = await response.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.warn("Response was not JSON:", responseText);
                data = { message: responseText || "No response from server" };
            }

            if (response.ok) {
                setPaymentSuccess(true);
                toast({
                    title: "Payment Successful!",
                    description: "Your VIP rank has been unlocked.",
                });
            } else {
                throw new Error(data.message || (typeof data === 'string' ? data : "Failed to update rank"));
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
            <div className="min-h-screen w-full flex items-center justify-center bg-black/95 p-4">
                <Card className="w-full max-w-md border-green-500/20 bg-green-500/10 backdrop-blur">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl text-green-500">Purchase Successful!</CardTitle>
                        <CardDescription className="text-gray-400">
                            Thank you, {username}. Your VIP rank has been activated.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center">
                        <Button
                            variant="outline"
                            className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                            onClick={() => window.location.href = "/"}
                        >
                            Return to Home
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black/95 p-4 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
            <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">Rank Shop</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Unlock exclusive perks with the VIP Rank
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="rounded-lg border border-zinc-800 bg-black/40 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-white">VIP Rank</h3>
                            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500">
                                Lifetime
                            </span>
                        </div>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                <span>Priority Queue Access</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                <span>Exclusive Chat Color</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                <span>5x Home Set Points</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                <span>/fly in Lobby</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-zinc-200">Minecraft Username</Label>
                        <Input
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-zinc-800 bg-black/40 text-white placeholder:text-zinc-600 focus:border-blue-500"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <SiRazorpay className="mr-2 h-4 w-4" />
                                Simulate Pay ₹99
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
