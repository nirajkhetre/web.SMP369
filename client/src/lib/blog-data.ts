export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "complete-guide-to-369-smp-commands",
    title: "Complete Guide to 369 SMP Commands: Master the Server",
    excerpt: "Learn all the essential commands for 369-MC SMP, from claiming land to teleporting. A must-read for new players!",
    date: "December 4, 2024",
    author: "369 Gaming",
    readTime: "5 min read",
    image: "/screenshot1.png",
    content: `
      <h2>Introduction</h2>
      <p>Welcome to 369-MC SMP! To help you get started and thrive in our world, we've compiled a comprehensive guide to the most important commands you'll need. Whether you're a seasoned veteran or a newcomer, mastering these commands is key to your survival.</p>

      <h2>Essential Survival Commands</h2>
      
      <h3>1. Land Claiming (/claim)</h3>
      <p>Protecting your hard work is crucial. We use a sophisticated claiming system to prevent griefing.</p>
      <ul>
        <li><strong>/claim</strong>: Creates a protected area around you. You'll need a golden shovel to resize it.</li>
        <li><strong>/trust [player]</strong>: Gives another player permission to build in your claim.</li>
        <li><strong>/untrust [player]</strong>: Removes a player's permissions.</li>
        <li><strong>/abandonclaim</strong>: Deletes your claim (be careful!).</li>
      </ul>

      <h3>2. Teleportation (/tpa, /rtp, /home)</h3>
      <p>Getting around the vast world of 369 SMP is easy with these commands:</p>
      <ul>
        <li><strong>/rtp</strong>: Randomly teleports you to a wild area. Perfect for finding a new spot to build!</li>
        <li><strong>/sethome [name]</strong>: Sets a home point at your current location.</li>
        <li><strong>/home [name]</strong>: Teleports you back to your set home.</li>
        <li><strong>/tpa [player]</strong>: Sends a request to teleport to another player.</li>
        <li><strong>/tpaccept</strong>: Accepts a teleport request.</li>
      </ul>

      <h3>3. Economy & Shop</h3>
      <p>Our server features a player-driven economy.</p>
      <ul>
        <li><strong>/balance</strong>: Checks your current money.</li>
        <li><strong>/pay [player] [amount]</strong>: Sends money to another player.</li>
        <li><strong>/shop</strong>: Opens the server shop GUI to buy and sell items.</li>
      </ul>

      <h2>Advanced Features</h2>
      <p>Don't forget to check out our unique features like <strong>Custom Enchants</strong> and <strong>Skills</strong>. Use <strong>/help</strong> in-game for a full list of commands available to your rank.</p>
    `
  },
  {
    slug: "what-is-369-smp",
    title: "What is 369 SMP? A New Era of Survival Minecraft",
    excerpt: "Discover what makes 369-MC SMP unique. From our 'Not Pay-to-Win' philosophy to our vibrant community.",
    date: "December 3, 2024",
    author: "369 Gaming",
    readTime: "4 min read",
    image: "/screenshot2.png",
    content: `
      <h2>More Than Just a Server</h2>
      <p>In a sea of Minecraft servers, <strong>369-MC SMP</strong> stands out as a beacon for players who crave an authentic, fair, and engaging survival experience. But what exactly makes us different?</p>

      <h2>The "Not Pay-to-Win" Philosophy</h2>
      <p>We believe that success in Minecraft should be earned, not bought. Unlike many servers that sell overpowered gear for real money, 369 SMP is strictly <strong>Not Pay-to-Win</strong>. Our store sells cosmetic items and a "Rank Unlocker" (which we'll explain in another post), but the best gear, strongest weapons, and highest statuses must be achieved through gameplay.</p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Cross-Platform Play:</strong> We support both Java and Bedrock editions. Play with your friends regardless of their device!</li>
        <li><strong>Custom Terrain:</strong> Explore a world generated with breathtaking custom biomes that you won't find in vanilla Minecraft.</li>
        <li><strong>Community Events:</strong> We host regular events like PvP tournaments, build battles, and treasure hunts with exclusive rewards.</li>
        <li><strong>Active Staff:</strong> Our team is always online or available on Discord to ensure a safe and toxic-free environment.</li>
      </ul>

      <h2>Join the Revolution</h2>
      <p>If you're looking for a server where your skills matter, where the community is welcoming, and where the adventure never ends, 369-MC SMP is the place for you. Join us today at <strong>play.smp369.online</strong>!</p>
    `
  },
  {
    slug: "369-smp-rank-system",
    title: "Understanding the 369 SMP Rank System",
    excerpt: "How does the Rank Unlocker work? How do you rank up? We explain our unique progression system.",
    date: "December 2, 2024",
    author: "369 Gaming",
    readTime: "6 min read",
    image: "/screenshot3.png",
    content: `
      <h2>A Fair Progression System</h2>
      <p>At 369-MC SMP, we've designed a rank system that rewards dedication and playtime. Here's everything you need to know about how to climb the ladder.</p>

      <h2>The "Rank Unlocker"</h2>
      <p>You might have seen the <strong>Rank Unlocker</strong> in our shop for just ₹49. What does it do?</p>
      <p>The Rank Unlocker is a one-time purchase that opens the door to our ranked progression. It instantly grants you the <strong>Novice</strong> rank. But that's just the beginning.</p>

      <h2>Ranking Up Through Gameplay</h2>
      <p>Once you have the Novice rank, you cannot buy further ranks with real money. You must earn them! We have a series of ranks (Apprentice, Knight, Lord, Titan) that are unlocked by completing in-game challenges such as:</p>
      <ul>
        <li><strong>Playtime:</strong> Spending time on the server.</li>
        <li><strong>Mining:</strong> Gathering resources.</li>
        <li><strong>Combat:</strong> Defeating mobs and bosses.</li>
        <li><strong>Economy:</strong> Earning in-game currency.</li>
      </ul>

      <h2>Perks of Ranking Up</h2>
      <p>Each rank comes with its own set of perks, including:</p>
      <ul>
        <li>More <strong>/sethome</strong> slots.</li>
        <li>Access to special kits (daily/weekly).</li>
        <li>Cosmetic particles and chat prefixes.</li>
        <li>Ability to create player shops.</li>
      </ul>

      <h2>Why This System?</h2>
      <p>This hybrid system supports the server's maintenance costs (via the small Rank Unlocker fee) while ensuring that high-level players have actually earned their status. It keeps the economy balanced and the competition fair.</p>
    `
  }
];

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return blogPosts.find(post => post.slug === slug);
}
