import StoryblokClient from "storyblok-js-client";

export function createStoryblokClient(config: {
  accessToken: string;
  region?: "eu" | "us";
}) {
  return new StoryblokClient({
    accessToken: config.accessToken,
    region: config.region ?? "eu",
  });
}
