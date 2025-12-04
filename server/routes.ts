import type { Express } from "express";
import { createServer, type Server } from "http";

const serverInfo = {
  name: "369-MC SMP",
  ip: "play.smp369.online",
  bedrockPort: "64412",
  version: "1.21.x (Latest)",
  capacity: 100,
  capacityDisplay: "100 Players",
  owner: "369 Gaming",
  requirements: "Minecraft Java/Bedrock Edition",
  lastUpdated: "December 2024",
  category: "Survival Multiplayer (SMP)",
  location: "Asia-Pacific",
  features: ["Land Claims", "Economy System", "Custom Enchants", "Events", "PvP Arenas", "Community Builds"],
  rating: 4.8,
  status: "online",
  playerCount: 47,
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/server-info", (_req, res) => {
    res.json(serverInfo);
  });

  app.get("/api/server-status", (_req, res) => {
    res.json({
      status: serverInfo.status,
      playerCount: serverInfo.playerCount,
      maxPlayers: serverInfo.capacity,
    });
  });

  app.post("/api/create-order", async (req, res) => {
    try {
      const Razorpay = (await import("razorpay")).default;
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
        key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
      });

      const options = {
        amount: req.body.amount * 100, // amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_" + Date.now(),
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error("Razorpay error:", error);
      res.status(500).json({ message: "Error creating order" });
    }
  });

  app.post("/api/simulate-payment", async (req, res) => {
    try {
      const { username, rank, orderId, paymentId, amount } = req.body;

      const lambdaResponse = await fetch(
        "https://nikaixeqpk.execute-api.us-east-1.amazonaws.com/default/paymentUpdateHandler",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, rank, orderId, paymentId, amount }),
        }
      );

      const text = await lambdaResponse.text();
      res.status(lambdaResponse.status).json({ lambda: text });

    } catch (error) {
      console.error("Simulation error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
