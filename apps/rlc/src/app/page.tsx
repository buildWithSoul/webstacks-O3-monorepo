import { fetchStory } from "@repo/storyblok";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { StoryblokStory } from "@storyblok/react/rsc";

async function page() {
  const story = await fetchStory("home", {
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN!,
    region: "eu",
  });

  console.log(story, "story");
  return (
    <div>
      <StoryblokStory story={story} />
    </div>
  );
}

export default page;
