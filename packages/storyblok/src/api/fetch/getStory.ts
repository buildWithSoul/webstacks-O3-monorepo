import { createStoryblokClient } from "../client";

export async function fetchStory(
  slug: string,
  config: {
    accessToken: string;
    version?: "draft" | "published";
    region?: "eu" | "us";
  }
) {
  const client = createStoryblokClient({
    accessToken: config.accessToken || 'GMyN9DiOZ9OGgCtgmrOtjgtt',
    region: config.region,
  });

  const { data } = await client.getStory(slug, {
    version: config.version ?? "draft",
  });

  return data.story;
}
