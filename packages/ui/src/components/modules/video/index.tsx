"use client";

import { useState } from "react";
import { VideoPlayButton } from "../../atoms";
import { StoryblokAsset } from "../../../types/storyblok";

type VideoProps = {
  video: StoryblokAsset;
  thumbnail?: StoryblokAsset;
  autoPlay?: boolean;
};

const isEmbedUrl = (url: string): boolean => {
  const embedPatterns = [
    'youtube.com/embed',
    'youtu.be',
    'vimeo.com',
    'player.vimeo',
    'dailymotion.com/embed',
    'storyblok.com/video/embed'
  ];
  return embedPatterns.some(pattern => url.includes(pattern));
};

export function Video({
  video,
  thumbnail,
  autoPlay = false,
}: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const videoUrl = video.filename;
  const isEmbed = isEmbedUrl(videoUrl);

  return (
    <div className="relative w-full aspect-video bg-(--surface-background)">
      {!isPlaying && thumbnail && (
        <img
          src={thumbnail.filename}
          alt={thumbnail.alt ?? "Video thumbnail"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {!isPlaying && (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 flex items-center justify-center group"
          aria-label="Play video"
        >
          <VideoPlayButton />
        </button>
      )}

      {isPlaying && (
        <>
          {isEmbed ? (
            <iframe
              src={videoUrl}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Video player"
            />
          ) : (
            <video
              src={videoUrl}
              className="absolute inset-0 h-full w-full"
              controls
              autoPlay={autoPlay}
              playsInline
            >
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          )}
        </>
      )}
    </div>
  );
}