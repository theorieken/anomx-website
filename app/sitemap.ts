import type { MetadataRoute } from "next";

const baseUrl = "https://anomx.io";
const lastModified = new Date("2026-05-07");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "weekly",
      lastModified,
      priority: 1,
      url: baseUrl
    },
    {
      changeFrequency: "weekly",
      lastModified,
      priority: 0.9,
      url: `${baseUrl}/join-waitlist`
    },
    {
      changeFrequency: "monthly",
      lastModified,
      priority: 0.7,
      url: `${baseUrl}/coming-soon`
    },
    {
      changeFrequency: "yearly",
      lastModified,
      priority: 0.3,
      url: `${baseUrl}/impressum`
    },
    {
      changeFrequency: "yearly",
      lastModified,
      priority: 0.3,
      url: `${baseUrl}/datenschutzerklaerung`
    },
    {
      changeFrequency: "yearly",
      lastModified,
      priority: 0.3,
      url: `${baseUrl}/nutzungsbedingungen`
    }
  ];
}
