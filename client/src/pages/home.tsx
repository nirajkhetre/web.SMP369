import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShopSection } from "@/components/shop-section";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";
import {
  Server,
  Users,
  Globe,
  Shield,
  Zap,
  Star,
  Copy,
  Check,
  ChevronRight,
  Gamepad2,
  Mountain,
  Swords,
  Crown,
  Map as MapIcon,
  Heart,
  Trophy,
  Settings,
  HelpCircle,
  Image,
  Info,
  Play,
  Clock,
  MapPin,
  Tag,
  RefreshCw,
  Sparkles,
  Menu,
  X,
  ShoppingCart,
  MessageSquare,
} from "lucide-react";
import { SEO } from "@/components/seo";

interface ServerInfo {
  name: string;
  ip: string;
  bedrockPort: string;
  version: string;
  capacity: number;
  capacityDisplay: string;
  owner: string;
  requirements: string;
  lastUpdated: string;
  category: string;
  location: string;
  features: string[];
  rating: number;
  status: string;
  playerCount: number;
}

const defaultServerInfo: ServerInfo = {
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
  features: ["Lobby System", "RTP", "Combat Tag", "Economy & Shop", "Teams", "Custom Spawners", "Rank Progression"],
  rating: 4.8,
  status: "online",
  playerCount: 47,
};

const tableOfContents = [
  { id: "server-info", title: "Server Info", icon: Info },
  { id: "shop", title: "Rank Shop", icon: ShoppingCart },
  { id: "screenshots", title: "Screenshots", icon: Image },
  { id: "what-is", title: "What is 369-MC SMP?", icon: HelpCircle },
  { id: "who-started", title: "Who Started 369-MC SMP?", icon: Crown },
  { id: "how-to-join", title: "How to Join", icon: Play },
  { id: "why-join", title: "Why Should You Join?", icon: Heart },
  { id: "features", title: "Features and Games", icon: Gamepad2 },
  { id: "ranks", title: "Rank Progression", icon: Trophy },
  { id: "playing", title: "Playing Minecraft on 369-MC", icon: Swords },
  { id: "server-ip", title: "Server IP", icon: Server },
  { id: "faqs", title: "FAQs", icon: HelpCircle },
];

const features = [
  { icon: Shield, title: "Lobby System", description: "Protected hub with launchpads and no hunger/damage" },
  { icon: MapIcon, title: "RTP System", description: "Random Teleport to find safe spots in the wild" },
  { icon: Swords, title: "Combat System", description: "Fair PVP with anti-combat logging and tagging" },
  { icon: Zap, title: "Economy & Shop", description: "Player shops, Auction House, and server economy" },
  { icon: Users, title: "Teams", description: "Create teams, invite friends, and manage alliances" },
  { icon: Trophy, title: "Rank Progression", description: "Mine ores to rank up - not just pay to win!" },
  { icon: Star, title: "Custom Spawners", description: "Upgradable spawners with internal storage and custom loot" },
];

const faqs = [
  {
    question: "Is 369-MC SMP free to join?",
    answer: "Yes! 369-MC SMP is completely free to join. Simply connect using our server IP and start playing right away. We offer optional cosmetic ranks for those who wish to support the server.",
  },
  {
    question: "Can I play on Bedrock Edition?",
    answer: "Absolutely! We support both Java and Bedrock Edition players. Java users connect directly to play.smp369.online, while Bedrock users need to add the port 64412.",
  },
  {
    question: "How do I protect my builds?",
    answer: "We use a land claiming system. Once you find the perfect spot, use /claim to protect your area. You can expand your claim as you earn more claim blocks through playtime.",
  },
  {
    question: "Are there any rules I should know?",
    answer: "We have simple rules: No griefing, no hacking/cheating, be respectful to other players, and no excessive spam. Full rules are available on our Discord server.",
  },
  {
    question: "How can I get help if I have issues?",
    answer: "Our friendly staff team is available in-game and on our Discord server. Use /help for commands or reach out to any online staff member for assistance.",
  },
  {
    question: "What makes 369-MC different from other SMPs?",
    answer: "We focus on creating a welcoming community with regular events, unique custom features, and dedicated staff. Our server has been running stable with consistent updates and player-focused improvements.",
  },
];

const screenshots = [
  { title: "Spawn Area", description: "Our beautiful custom spawn", image: "/screenshot1.png" },
  { title: "Community Builds", description: "Amazing player creations", image: "/screenshot2.png" },
  { title: "PvP Arena", description: "Battle other players", image: "/screenshot3.png" },
  { title: "Custom Terrain", description: "Explore unique landscapes", image: "/screenshot4.png" },
];

function JoinServerModal({
  open,
  onOpenChange,
  serverInfo
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serverInfo: ServerInfo;
}) {
  const { toast } = useToast();
  const [copiedIp, setCopiedIp] = useState(false);
  const [copiedPort, setCopiedPort] = useState(false);

  const copyToClipboard = async (text: string, type: "ip" | "port") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "ip") {
        setCopiedIp(true);
        setTimeout(() => setCopiedIp(false), 2000);
      } else {
        setCopiedPort(true);
        setTimeout(() => setCopiedPort(false), 2000);
      }
      toast({
        title: "Copied!",
        description: `${type === "ip" ? "Server IP" : "Bedrock Port"} copied to clipboard`,
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-primary/30 glow-green" data-testid="modal-join-server">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-gradient-main text-center" data-testid="text-modal-title">
            Join 369-MC SMP
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid gap-4">
            <div className="p-4 rounded-md bg-muted/50 border border-border" data-testid="section-java-ip">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Java Edition IP</p>
                  <p className="text-xl font-mono font-bold text-primary break-all" data-testid="text-java-ip">
                    {serverInfo.ip}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(serverInfo.ip, "ip")}
                  data-testid="button-copy-ip"
                  className="w-full sm:w-10"
                >
                  {copiedIp ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-md bg-muted/50 border border-border" data-testid="section-bedrock-port">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bedrock Edition Port</p>
                  <div className="flex flex-col sm:flex-row items-center gap-2 flex-wrap justify-center sm:justify-start">
                    <p className="text-xl font-mono font-bold text-chart-2" data-testid="text-bedrock-port">
                      {serverInfo.bedrockPort}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Use same IP + this port
                    </Badge>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(serverInfo.bedrockPort, "port")}
                  data-testid="button-copy-port"
                  className="w-full sm:w-10"
                >
                  {copiedPort ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-testid="grid-server-details">
            {[
              { icon: Server, label: "Server Name", value: serverInfo.name, testId: "text-server-name" },
              { icon: RefreshCw, label: "Version", value: serverInfo.version, testId: "text-version" },
              { icon: Users, label: "Capacity", value: serverInfo.capacityDisplay, testId: "text-capacity" },
              { icon: Crown, label: "Owner", value: serverInfo.owner, testId: "text-owner" },
              { icon: Settings, label: "Requirements", value: serverInfo.requirements, testId: "text-requirements" },
              { icon: Clock, label: "Last Updated", value: serverInfo.lastUpdated, testId: "text-last-updated" },
              { icon: Tag, label: "Category", value: serverInfo.category, testId: "text-category" },
              { icon: MapPin, label: "Location", value: serverInfo.location, testId: "text-location" },
            ].map((item, index) => (
              <div key={index} className="p-3 rounded-md bg-muted/30 border-l-2 border-l-primary/50" data-testid={`card-info-${index}`}>
                <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  <item.icon className="h-3 w-3" />
                  {item.label}
                </div>
                <p className="text-sm font-medium text-foreground" data-testid={item.testId}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-md bg-muted/30 border-l-2 border-l-chart-2/50" data-testid="section-features-list">
            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-2">
              <Sparkles className="h-3 w-3" />
              Features
            </div>
            <div className="flex flex-wrap gap-2">
              {serverInfo.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs" data-testid={`badge-feature-${index}`}>
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap p-3 rounded-md bg-chart-3/10 border border-chart-3/20" data-testid="section-rating">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-chart-3 fill-chart-3" />
              <span className="font-semibold">Community Rating</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(serverInfo.rating)
                    ? "text-chart-3 fill-chart-3"
                    : "text-muted-foreground"
                    }`}
                  data-testid={`star-rating-${i}`}
                />
              ))}
              <span className="ml-2 font-bold text-chart-3" data-testid="text-rating-value">{serverInfo.rating}/5</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TableOfContents({ activeSection }: { activeSection: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden p-3 bg-primary text-primary-foreground rounded-full shadow-lg glow-green"
        data-testid="button-toc-toggle"
        aria-label="Toggle table of contents"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <nav
        className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100"
          }`}
        data-testid="nav-table-of-contents"
        aria-label="Table of contents"
      >
        <Card className="w-64 bg-card/95 backdrop-blur border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
              <MapIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contents</span>
            </div>
            <ul className="space-y-1">
              {tableOfContents.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all hover-elevate ${activeSection === item.id
                      ? "bg-primary/20 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                    data-testid={`link-toc-${item.id}`}
                    aria-current={activeSection === item.id ? "true" : undefined}
                  >
                    <span className="text-xs font-mono text-muted-foreground w-4">{index + 1}</span>
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </nav>
    </>
  );
}

function HeroSection({ onJoinClick, serverInfo }: { onJoinClick: () => void; serverInfo: ServerInfo }) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="369-MC SMP - Best Minecraft Survival Server | No Pay-to-Win"
        description="Join 369-MC SMP, the ultimate Minecraft survival server with custom terrain, skills, and a fair no pay-to-win economy. Play on Java & Bedrock!"
        keywords={["minecraft server", "survival smp", "best minecraft server", "no pay to win", "custom terrain", "minecraft india", "369 smp", "smp369"]}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-grid-pattern" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="w-32 h-32 mx-auto mb-8 relative" data-testid="logo-container">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-chart-2 rounded-2xl rotate-6 opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-chart-2 rounded-2xl -rotate-3 opacity-75" />
            <div className="relative w-full h-full bg-card rounded-2xl flex items-center justify-center border border-primary/30 glow-green">
              <img src="/logo.png" alt="369-MC Logo" className="w-full h-full object-contain p-2" data-testid="image-logo" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4" data-testid="heading-main">
            <span className="text-gradient-main">369-MC SMP</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4" data-testid="text-subtitle">
            Premium Minecraft Survival Experience
          </p>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed" data-testid="text-description">
            Welcome to 369-MC SMP, the ultimate Minecraft survival multiplayer server where adventure awaits around every corner.
            Build incredible structures, form alliances with fellow players, explore vast custom terrains, and create memories
            that last a lifetime. With our dedicated community, regular events, and unique features, your Minecraft journey
            starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none">
            <Button
              size="lg"
              onClick={onJoinClick}
              className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 py-6 glow-green animate-pulse-glow"
              data-testid="button-join-server"
            >
              <Play className="mr-2 h-5 w-5" />
              Join Server
            </Button>
            <a href="https://discord.gg/cMUbXXjh" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-8 sm:px-12 py-6 w-full bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-[#5865F2] border-[#5865F2]/50 shadow-lg shadow-[#5865F2]/10 hover:shadow-[#5865F2]/20 transition-all duration-300">
                <MessageSquare className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Join Discord
              </Button>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground" data-testid="status-bar">
            <div className="flex items-center gap-2" data-testid="status-online">
              <div className={`w-2 h-2 rounded-full animate-pulse ${serverInfo.status === 'online' ? 'bg-status-online' : 'bg-status-offline'}`} />
              <span>Server {serverInfo.status === 'online' ? 'Online' : 'Offline'}</span>
            </div>
            <div className="flex items-center gap-2" data-testid="status-players">
              <Users className="h-4 w-4" />
              <span>{serverInfo.playerCount}+ Active Players</span>
            </div>
            <div className="flex items-center gap-2" data-testid="status-platforms">
              <Globe className="h-4 w-4" />
              <span>Java & Bedrock</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServerInfoSection({ serverInfo, isLoading }: { serverInfo: ServerInfo; isLoading: boolean }) {
  if (isLoading) {
    return (
      <section id="server-info" className="py-16 md:py-24 bg-muted/30" data-testid="section-server-info-loading">
        <div className="container mx-auto px-6 lg:pr-72">
          <div className="flex items-center gap-3 mb-8">
            <Skeleton className="w-10 h-10 rounded-md" />
            <Skeleton className="w-48 h-10" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="server-info" className="py-16 md:py-24 bg-muted/30" data-testid="section-server-info">
      <div className="container mx-auto px-6 lg:pr-72">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/20 rounded-md">
            <Server className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-server-info">Server Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "Server Name", value: serverInfo.name, highlight: true, testId: "info-server-name" },
            { label: "Latest Version", value: serverInfo.version, testId: "info-version" },
            { label: "Player Capacity", value: serverInfo.capacityDisplay, testId: "info-capacity" },
            { label: "Owner", value: serverInfo.owner, testId: "info-owner" },
            { label: "Requirements", value: serverInfo.requirements, testId: "info-requirements" },
            { label: "Last Updated", value: serverInfo.lastUpdated, testId: "info-last-updated" },
            { label: "Server Category", value: serverInfo.category, testId: "info-category" },
            { label: "Server Location", value: serverInfo.location, testId: "info-location" },
          ].map((item, index) => (
            <Card key={index} className={`hover-elevate ${item.highlight ? "border-primary/30" : ""}`} data-testid={`card-${item.testId}`}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-1 h-12 rounded-full ${item.highlight ? "bg-primary" : "bg-muted-foreground/30"}`} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className={`text-lg font-semibold ${item.highlight ? "text-primary" : ""}`} data-testid={item.testId}>{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4 hover-elevate" data-testid="card-features">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-1 h-12 rounded-full bg-chart-2" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Features</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {serverInfo.features.map((feature, i) => (
                    <Badge key={i} variant="secondary" data-testid={`badge-info-feature-${i}`}>{feature}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 border-chart-3/30 hover-elevate" data-testid="card-rating">
          <CardContent className="p-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-chart-3 fill-chart-3" />
              <span className="font-semibold">Community Rating</span>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(serverInfo.rating) ? "text-chart-3 fill-chart-3" : "text-muted"
                    }`}
                  data-testid={`star-info-${i}`}
                />
              ))}
              <span className="text-xl font-bold text-chart-3 ml-2" data-testid="text-info-rating">{serverInfo.rating}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ScreenshotsSection() {
  return (
    <section id="screenshots" className="py-16 md:py-24" data-testid="section-screenshots">
      <div className="container mx-auto px-6 lg:pr-72">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-chart-2/20 rounded-md">
            <Image className="h-6 w-6 text-chart-2" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-screenshots">Screenshots</h2>
        </div>

        <div className="mx-auto max-w-5xl px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {screenshots.map((screenshot, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <Card className="overflow-hidden group hover-elevate h-full" data-testid={`card-screenshot-${index}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={screenshot.image}
                        alt={screenshot.title}
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="font-semibold text-white" data-testid={`text-screenshot-title-${index}`}>{screenshot.title}</p>
                          <p className="text-sm text-gray-300" data-testid={`text-screenshot-desc-${index}`}>{screenshot.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function WhatIsSection() {
  return (
    <section id="what-is" className="py-16 md:py-24 bg-muted/30" data-testid="section-what-is">
      <div className="container mx-auto px-6 lg:pr-72">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/20 rounded-md">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-what-is">What is 369-MC SMP?</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-what-is-1">
              369-MC SMP is a premium Minecraft Survival Multiplayer server designed for players who seek an authentic
              yet enhanced survival experience. We combine the classic Minecraft survival gameplay with carefully
              curated plugins and features that enhance your adventure without overwhelming the vanilla feel.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-what-is-2">
              Our server runs on the latest Minecraft version and supports both Java and Bedrock Edition players,
              ensuring everyone can join the fun regardless of their platform. With a focus on community building,
              fair play, and exciting events, 369-MC SMP offers something for every type of player.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, label: "Protected Builds" },
              { icon: Users, label: "Active Community" },
              { icon: Zap, label: "Custom Features" },
              { icon: Trophy, label: "Regular Events" },
            ].map((item, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-what-is-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/20 rounded-full flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-semibold" data-testid={`text-what-is-feature-${index}`}>{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoStartedSection() {
  return (
    <section id="who-started" className="py-16 md:py-24" data-testid="section-who-started">
      <div className="container mx-auto px-6 lg:pr-72">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-chart-3/20 rounded-md">
            <Crown className="h-6 w-6 text-chart-3" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-who-started">Who Started 369-MC SMP?</h2>
        </div>

        <Card className="hover-elevate" data-testid="card-who-started">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-chart-2 rounded-2xl flex items-center justify-center flex-shrink-0" data-testid="icon-owner">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gradient-gold" data-testid="text-owner-name">369 Gaming</h3>
                <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-owner-desc-1">
                  369-MC SMP was founded by 369 Gaming, a passionate group of Minecraft enthusiasts dedicated to
                  creating the ultimate survival multiplayer experience. With years of experience running gaming
                  communities and a deep love for Minecraft, the team set out to build a server that balances
                  competitive gameplay with a welcoming, friendly atmosphere.
                </p>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-owner-desc-2">
                  The vision behind 369-MC SMP is simple: create a space where players can build, explore, and
                  connect without worrying about griefing or unfair advantages. Every feature and rule has been
                  carefully designed with the community in mind, making it a server that truly belongs to its players.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function HowToJoinSection({ onJoinClick }: { onJoinClick: () => void }) {
  const steps = [
    { step: 1, title: "Launch Minecraft", description: "Open your Minecraft game (Java or Bedrock Edition)" },
    { step: 2, title: "Go to Multiplayer", description: "Click on 'Multiplayer' from the main menu" },
    { step: 3, title: "Add Server", description: "Click 'Add Server' and enter our server details" },
    { step: 4, title: "Enter IP Address", description: "Type: play.smp369.online (Port 64412 for Bedrock)" },
    { step: 5, title: "Join & Play", description: "Click 'Join Server' and start your adventure!" },
  ];

  return (
    <section id="how-to-join" className="py-16 md:py-24 bg-muted/30" data-testid="section-how-to-join">
      <div className="container mx-auto px-6 lg:pr-72">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/20 rounded-md">
            <Play className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-how-to-join">How to Join 369-MC SMP</h2>
        </div>

        <div className="grid gap-4">
          {steps.map((item) => (
            <Card key={item.step} className="hover-elevate" data-testid={`card-step-${item.step}`}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0" data-testid={`badge-step-${item.step}`}>
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg" data-testid={`text-step-title-${item.step}`}>{item.title}</h3>
                  <p className="text-muted-foreground" data-testid={`text-step-desc-${item.step}`}>{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button size="lg" onClick={onJoinClick} className="glow-green" data-testid="button-join-server-2">
            <Server className="mr-2 h-5 w-5" />
            Get Server Details
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyJoinSection() {
  const reasons = [
    { icon: Shield, title: "Safe & Secure", description: "Advanced protection against griefers and hackers" },
    { icon: Users, title: "Friendly Community", description: "Join a welcoming and helpful player base" },
    { icon: Zap, title: "Lag-Free Experience", description: "Optimized server for smooth gameplay" },
    { icon: Trophy, title: "Exciting Events", description: "Weekly events with amazing rewards" },
    { icon: Globe, title: "Cross-Platform", description: "Play with Java and Bedrock friends" },
    { icon: Heart, title: "Active Staff", description: "Dedicated team available to help" },
  ];

  return (
    <section id="why-join" className="py-16 md:py-24" data-testid="section-why-join">
      <div className="container mx-auto px-6 lg:pr-72">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-destructive/20 rounded-md">
            <Heart className="h-6 w-6 text-destructive" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-why-join">Why Should You Join?</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-reason-${index}`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <reason.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2" data-testid={`text-reason-title-${index}`}>{reason.title}</h3>
                <p className="text-muted-foreground text-sm" data-testid={`text-reason-desc-${index}`}>{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30" data-testid="section-features">
      <div className="container mx-auto px-6 lg:pr-72">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-chart-2/20 rounded-md">
            <Gamepad2 className="h-6 w-6 text-chart-2" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-features">Features and Games</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate group" data-testid={`card-feature-${index}`}>
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2" data-testid={`text-feature-title-${index}`}>{feature.title}</h3>
                <p className="text-muted-foreground text-sm" data-testid={`text-feature-desc-${index}`}>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function RanksSection() {
  const ranks = [
    { name: "Novice", cost: "Free", perks: ["2% Shop Discount", "+1 Home", "3% Mining XP Boost"] },
    { name: "Explorer", cost: "$5,000 + 150 Iron Ore", perks: ["5% Shop Discount", "Reduced RTP Cooldown", "+1 Auction Slot", "10% Spawner Speed Boost"] },
    { name: "Artisan", cost: "$10,000 + 200 Gold Ore", perks: ["7% Shop Discount", "+2 Homes", "Auto-Smelt Ores", "20% Spawner Speed Boost"] },
    { name: "Captain", cost: "$20,000 + 300 Redstone Ore", perks: ["10% Shop Discount", "+3 Auction Slots", "-20% Auction Tax", "50% Spawner Speed Boost", "/jump", "/pv 1"] },
    { name: "Champion", cost: "$35,000 + 150 Diamond Ore", perks: ["15% Shop Discount", "+5 Homes", "-50% Auction Tax", "100% Spawner Speed Boost", "/repair", "Champion Shop"] },
    { name: "Legend", cost: "$50,000 + 200 Emerald Ore", perks: ["No Auction Tax", "+10 Auction Slots", "Permanent Spawner Boost", "/fly", "/pv 3", "Legend Chat Tag"] },
  ];

  return (
    <section id="ranks" className="py-16 md:py-24" data-testid="section-ranks">
      <div className="container mx-auto px-6 lg:pr-72">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-chart-3/20 rounded-md">
            <Trophy className="h-6 w-6 text-chart-3" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-ranks">Rank Progression</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ranks.map((rank, index) => (
            <Card key={index} className="hover-elevate border-primary/20" data-testid={`card-rank-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-primary" data-testid={`text-rank-name-${index}`}>{rank.name}</h3>
                  <Badge variant="outline" className="text-xs" data-testid={`badge-rank-cost-${index}`}>{rank.cost}</Badge>
                </div>
                <ul className="space-y-2">
                  {rank.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground" data-testid={`text-rank-perk-${index}-${i}`}>
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlayingSection() {
  return (
    <section id="playing" className="py-16 md:py-24 bg-muted/30" data-testid="section-playing">
      <div className="container mx-auto px-6 lg:pr-72">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/20 rounded-md">
            <Swords className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-playing">Playing Minecraft on 369-MC</h2>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Experience Minecraft like never before. Our server offers a unique blend of survival gameplay with custom features that enhance your experience.
            Whether you are a builder, explorer, or fighter, there is something for everyone. Join our community today and start your adventure!
          </p>
        </div>
      </div>
    </section>
  );
}

function ServerIPSection({ serverInfo }: { serverInfo: ServerInfo }) {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Server IP copied to clipboard",
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="server-ip" className="py-16 md:py-24" data-testid="section-server-ip">
      <div className="container mx-auto px-6 lg:pr-72">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-chart-2/20 rounded-md">
            <Server className="h-6 w-6 text-chart-2" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-server-ip">Server IP</h2>
        </div>
        <Card className="bg-card/50 backdrop-blur border-primary/20">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-lg text-muted-foreground mb-2">Connect with IP:</p>
              <code className="text-2xl md:text-3xl font-mono font-bold text-primary bg-muted px-4 py-2 rounded-md block">
                {serverInfo.ip}
              </code>
            </div>
            <Button size="lg" onClick={() => copyToClipboard(serverInfo.ip)} className="glow-green">
              <Copy className="mr-2 h-5 w-5" />
              Copy IP
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faqs" className="py-16 md:py-24 bg-muted/30" data-testid="section-faqs">
      <div className="container mx-auto px-6 lg:pr-72">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/20 rounded-md">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-faqs">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gradient-main">369-MC SMP</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              The ultimate Minecraft survival experience. Join our community today and start your adventure!
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#shop" className="hover:text-primary transition-colors">Store</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">Read our Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 369-MC SMP. All rights reserved.</p>
          <p className="mt-2">Not affiliated with Mojang Studios.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("server-info");

  const { data: serverInfo = defaultServerInfo, isLoading } = useQuery({
    queryKey: ["serverInfo"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/server-info");
        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType || !contentType.includes("application/json")) {
          return defaultServerInfo;
        }
        return await response.json();
      } catch (error) {
        console.error("Failed to fetch server info:", error);
        return defaultServerInfo;
      }
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <JoinServerModal
        open={isJoinModalOpen}
        onOpenChange={setIsJoinModalOpen}
        serverInfo={serverInfo}
      />

      <TableOfContents activeSection={activeSection} />

      <main className="relative">
        <HeroSection onJoinClick={() => setIsJoinModalOpen(true)} serverInfo={serverInfo} />
        <ServerInfoSection serverInfo={serverInfo} isLoading={isLoading} />
        <ShopSection />
        <ScreenshotsSection />
        <WhatIsSection />
        <WhoStartedSection />
        <HowToJoinSection onJoinClick={() => setIsJoinModalOpen(true)} />
        <WhyJoinSection />
        <FeaturesSection />
        <RanksSection />
        <PlayingSection />
        <ServerIPSection serverInfo={serverInfo} />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
