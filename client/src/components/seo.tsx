import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string[];
    image?: string;
    type?: "website" | "article" | "product";
    author?: string;
    date?: string;
    url?: string;
}

export function SEO({
    title,
    description = "369-MC SMP - The Ultimate Minecraft Survival Experience. Join our Not Pay-to-Win server with custom terrain, skills, and a friendly community.",
    keywords = ["minecraft server", "smp", "survival", "no pay to win", "custom terrain", "minecraft india"],
    image = "/screenshot1.png",
    type = "website",
    author = "369 Gaming",
    date,
    url
}: SEOProps) {
    const siteUrl = "https://play.smp369.online";
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

    // JSON-LD Structured Data
    const structuredData = type === "article" ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": fullImage,
        "author": {
            "@type": "Organization",
            "name": author
        },
        "publisher": {
            "@type": "Organization",
            "name": "369-MC SMP",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`
            }
        },
        "datePublished": date,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": fullUrl
        }
    } : {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "369-MC SMP",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "sameAs": [
            "https://discord.gg/cMUbXXjh",
            "mailto:sargeomark@gmail.com"
        ],
        "description": description
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(", ")} />
            <meta name="author" content={author} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content="369-MC SMP" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImage} />

            {/* Google Site Verification */}
            <meta name="google-site-verification" content="CEPGlCx_4vTdKxbLTxF2SBY0BayMALTJ2FBFv3c73V8" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
}
