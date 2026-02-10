import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://taoshomevalue.com",
      lastModified: new Date(),
    },
  ];
}
