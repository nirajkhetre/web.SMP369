# 369-MC SMP Website Design Guidelines

## Design Approach
**Gaming-Inspired Dark Theme**: Drawing from successful gaming community sites like Hypixel and modern Minecraft server websites, combined with clean Material Design principles for readability and structure.

## Core Design Elements

### Typography
- **Headings**: Minecraft-inspired bold sans-serif (e.g., 'Press Start 2P' for logo, 'Rajdhana' or 'Orbitron' for headers)
- **Body Text**: Clean sans-serif (Inter, Roboto) for readability
- **Sizes**: Logo (text-4xl to text-6xl), Section Headings (text-3xl to text-4xl), Subheadings (text-xl to text-2xl), Body (text-base to text-lg)

### Color Palette (Dark Theme)
- **Background**: Deep charcoal (#0a0a0a, #141414, #1a1a1a)
- **Cards/Surfaces**: Dark gray (#1f1f1f, #252525)
- **Primary Accent**: Vibrant green (#00ff88, #10b981) - Minecraft grass/creeper inspired
- **Secondary Accent**: Purple (#a855f7, #8b5cf6) - Nether portal vibes
- **Gold Highlights**: (#fbbf24, #f59e0b) - Achievement/premium feel
- **Text**: White (#ffffff), Light gray (#e5e7eb) for secondary text
- **Borders**: Subtle gray (#374151, #4b5563)

### Layout System
**Spacing**: Consistent use of 4, 8, 12, 16, 24, 32 px increments (Tailwind: p-4, p-8, p-12, etc.)
- **Container**: max-w-7xl centered with px-6 to px-8
- **Section Padding**: py-16 to py-24 on desktop, py-12 on mobile

## Component Specifications

### Hero Section (Top)
- **Layout**: Full-width dark gradient background (from #0a0a0a to #1a1a1a)
- **Content Structure** (centered):
  - Server logo image (256x256px) with subtle glow effect
  - Server name "369-MC SMP" (text-5xl to text-6xl, bold, gradient text green-to-purple)
  - Subtitle (text-xl, gray-400, max-w-2xl)
  - Description paragraph (text-lg, gray-300, max-w-3xl, leading-relaxed)
  - Large "Join Server" button (px-12 py-4, text-xl, vibrant green bg with hover glow)
- **Height**: 85vh with content vertically centered
- **Background Enhancement**: Subtle animated particles or gradient overlay

### Join Server Popup Modal
- **Overlay**: Dark backdrop (bg-black/80) with blur
- **Modal Container**: 
  - Dark gray card (bg-gray-900, max-w-2xl)
  - Rounded corners (rounded-2xl)
  - Border with green glow (border-2 border-green-500/50)
  - Shadow with colored glow effect
- **Content Layout**:
  - Header: "Join 369-MC SMP" (text-3xl, bold, green gradient)
  - Server IP section with copy button
    - Java IP: play.smp369.online (monospace font, large text)
    - Bedrock Port: 64412
    - Copy-to-clipboard icon buttons
  - Server info grid (2 columns on desktop, 1 on mobile)
  - Close button (top-right, X icon with hover effect)

### Server Information Table
- **Style**: Modern card-based grid layout, not traditional table
- **Grid**: 2 columns on desktop (grid-cols-2), single column mobile
- **Each Info Card**:
  - Dark background (#1f1f1f)
  - Label (text-sm, gray-400, uppercase)
  - Value (text-lg, white, bold)
  - Subtle border-left accent in green
  - Padding: p-4
- **Fields**: Server Name, Latest Version, Player Capacity, Owner, Requirements, Last Updated, Category, Location, Features (list), Rating (stars visual)

### Table of Contents Navigation
- **Position**: Sticky sidebar on desktop (left or right), collapsible on mobile
- **Style**: 
  - Dark card background
  - Numbered list with smooth scroll links
  - Active section highlighted in green
  - Hover states with subtle green glow
  - Compact spacing (py-2 for each item)

### Content Sections
**Section Pattern** (repeated for each):
- Full-width container with alternating subtle background tints
- Section heading (text-3xl, bold, green accent underline or icon)
- Rich content with proper spacing
- Mix of text, images, and interactive elements

**Key Sections**:
1. **Screenshots Gallery**: Masonry grid (3-4 columns desktop), rounded images with hover zoom
2. **What is 369-MC SMP**: 2-column layout (text + feature list with icons)
3. **How to Join**: Step-by-step cards with numbered badges
4. **Features & Games**: Icon grid cards (3-4 columns) with game mode icons
5. **FAQs**: Accordion-style expandable cards

### Images
- **Hero Background**: Subtle Minecraft-themed abstract pattern or blurred server screenshot
- **Logo**: Cubic/pixel art style logo incorporating "369" and Minecraft aesthetics
- **Screenshots Section**: 6-8 in-game screenshots showing builds, events, gameplay
- **Feature Icons**: Minecraft item icons or custom pixel art icons for each feature
- **Treatment**: All images have subtle border glow on hover

### Interactive Elements
- **Buttons**: 
  - Primary: Green bg with white text, hover glow and scale
  - Secondary: Outlined green border, hover fill
  - Buttons on images: Backdrop blur (backdrop-blur-md) with semi-transparent dark background
- **Cards**: Subtle hover lift (translate-y-1) and border glow
- **Links**: Green text with underline on hover
- **Animations**: Minimal - fade-ins on scroll, smooth transitions (0.3s ease)

### Footer
- **Layout**: 3-column grid (desktop) with Logo/About, Quick Links, Social/Contact
- **Background**: Darkest shade (#0a0a0a)
- **Content**: Server status indicator, Discord/social links, copyright
- **Border-top**: Subtle green gradient line

## Accessibility & Polish
- Sufficient contrast ratios for dark theme readability
- Focus states with green outlines
- Smooth scroll behavior for navigation
- Loading states for server status
- Responsive breakpoints: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)