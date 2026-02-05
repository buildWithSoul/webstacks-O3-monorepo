"use client";
import { cva } from "class-variance-authority";
import { useState } from "react";
import type { FC } from "react";
import { SanityImage, SanityVideo } from "../../../types/sanity";
import videoStyles from "./styles";
import Image from "../image";
import { Icon } from "../../atoms";
import { VideoModal } from "../videoModal";

export const containerStyles = cva("relative w-full rounded-2xl", {
  variants: {
    noAspect: {
      true: "h-full",
      false: "aspect-video",
    },
    clickable: {
      true: "cursor-pointer group overflow-hidden",
      false: "overflow-hidden",
    },
  },
  defaultVariants: {
    noAspect: false,
    clickable: false,
  },
});

// Utility function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string => {
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/, // Standard patterns
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/, // Standard watch URL
    /youtu\.be\/([a-zA-Z0-9_-]{11})/, // Short URL
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/, // Embed URL
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // If no pattern matches, return the original URL (might already be just the ID)
  return url;
};

// Utility function to extract Wistia video ID from URL
const getWistiaVideoId = (url: string): string => {
  // Handle various Wistia URL formats
  const patterns = [
    /(?:wistia\.com\/medias\/)([a-zA-Z0-9]+)/, // Standard Wistia URL
    /(?:wistia\.net\/embed\/iframe\/)([a-zA-Z0-9]+)/, // Embed URL
    /(?:fast\.wistia\.net\/embed\/iframe\/)([a-zA-Z0-9]+)/, // Fast embed URL
    /(?:\/medias\/)([a-zA-Z0-9]+)/, // Relative URL
    /^([a-zA-Z0-9]+)$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // If no pattern matches, return the original URL (might already be just the ID)
  return url;
};

export interface VideoProps extends SanityVideo {
  thumbnailOverride?: SanityImage;
  noAspect?: boolean;
  displayMode?: "inline" | "modal"; // 'inline' for direct embedding, 'modal' for clickable popup
  aspectRatio?: string; // Custom aspect ratio class (e.g., 'aspect-[592/475]')
  playButtonPosition?: "center" | "bottom-left"; // Position of the play button
}

const Video: FC<VideoProps> = ({
  youtubeUrl,
  wistiaUrl,
  videoType,
  thumbnail,
  thumbnailOverride,
  title,
  noAspect,
  displayMode = "modal",
  aspectRatio,
  playButtonPosition = "center",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine which video URL to use based on videoType
  const videoUrl = videoType === "wistia" ? wistiaUrl : youtubeUrl;
  if (!videoUrl) return null;

  // Get the appropriate video ID based on video type
  const videoId =
    videoType === "wistia"
      ? getWistiaVideoId(wistiaUrl || "")
      : getYouTubeVideoId(youtubeUrl || "");

  // Get the container class with custom aspect ratio if provided
  const getContainerClass = (clickable = false) => {
    const baseClass = containerStyles({ noAspect, clickable });
    if (aspectRatio && !noAspect) {
      // Replace aspect-video with custom aspect ratio
      return baseClass.replace("aspect-video", aspectRatio);
    }
    return baseClass;
  };

  // Inline mode - direct video embed
  if (displayMode === "inline") {
    return (
      <div className={getContainerClass()}>
        <div className={videoStyles({ noAspect })}>
          {videoType === "wistia" ? (
            <div className="relative w-full h-full">
              <iframe
                src={`https://fast.wistia.net/embed/iframe/${videoId}?videoFoam=true`}
                title={title || "Wistia video"}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          ) : (
            <div className="relative w-full h-full">
  <iframe
    src={`https://www.youtube.com/embed/${videoId}`}
    title={title || 'YouTube video'}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="absolute inset-0 w-full h-full rounded-2xl"
  />
</div>


          )}
        </div>
      </div>
    );
  }

  // Modal mode - clickable thumbnail with popup (new behavior)
  // Use thumbnailOverride if available, otherwise fall back to video thumbnail
  const displayThumbnail = thumbnailOverride || thumbnail;

  const handlePlayClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={getContainerClass(true)} onClick={handlePlayClick}>
        {displayThumbnail ? (
          <Image
            {...displayThumbnail}
            className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-300"
            alt={title || "Video thumbnail"}
          />
        ) : (
          <div className="absolute inset-0 bg-purple-200" />
        )}
        {/* Play button overlay */}
        <div
          className={`absolute z-10 ${
            playButtonPosition === "bottom-left"
              ? "bottom-4 left-4"
              : "inset-0 flex items-center justify-center"
          }`}
        >
          <div className="flex size-[76px] justify-center items-center cursor-pointer rounded-2xl border-2 border-white bg-white/40 drop-shadow-lg backdrop-blur-md group-hover:bg-white/60 transition-colors duration-300">
            <Icon icon="play-fill" size={32} className="text-white" />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoId={videoId}
        title={title}
        videoType={videoType}
      />
    </>
  );
};

export default Video;
