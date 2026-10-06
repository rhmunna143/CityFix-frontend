import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://cityfix.local";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/about", "/services", "/transparency", "/contact"],
      disallow: ["/api/", "/dashboard/", "/staff/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
