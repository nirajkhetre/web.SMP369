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

  return httpServer;
}
