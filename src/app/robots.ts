import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/cart", "/wishlist"],
    },
    sitemap: "https://embedded.com/sitemap.xml",
  };
}
