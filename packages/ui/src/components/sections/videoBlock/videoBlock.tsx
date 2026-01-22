'use client';

import { useState, useRef } from 'react';
import { containerStyle } from './styles';

import type { FC } from 'react';
import { SanityPageContent } from '../../../types/sanity';

export interface VideoBlockProps extends SanityPageContent {
  size?: 'full' | 'large' | 'medium' | 'small';
  video?: {
    title?: string;
    videoType?: 'youtube' | 'wistia' | 'mp4';
    youtubeUrl?: string;
    wistiaUrl?: string;
    videoFile?: {
      asset?: {
        url?: string;
      };
    };
    thumbnail?: {
      alt?: string;
      asset?: {
        url?: string;
      };
    };
  };
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export const VideoBlock: FC<VideoBlockProps> = ({
  size = 'full',
  video,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Debug: Log the size value

  // Get width class based on size selection
  const getVideoWidthClass = () => {
    switch (size) {
      case 'full':
        return 'w-full';
      case 'large':
        return 'w-full max-w-5xl'; // ~1024px
      case 'medium':
        return 'w-full max-w-3xl'; // ~768px
      case 'small':
        return 'w-full max-w-2xl'; // ~672px
      default:
        return 'w-full max-w-4xl';
    }
  };
  
  const videoWidthClass = getVideoWidthClass();

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderVideo = () => {
    if (!video) return null;

    const { videoType, youtubeUrl, videoFile, thumbnail } = video;
    
    if (videoType === 'youtube' && youtubeUrl) {
      // Extract YouTube video ID
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = youtubeUrl.match(youtubeRegex);
      const videoId = match ? match[1] : null;

      if (!videoId) return null;

      return (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&controls=${controls ? 1 : 0}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          ></iframe>
        </div>
      );
    } else if (videoType === 'wistia' && video.wistiaUrl) {
      // Extract Wistia hashed ID from common URL formats
      // Examples:
      // - https://company.wistia.com/medias/kdhsjzoap5
      // - https://fast.wistia.net/embed/iframe/kdhsjzoap5
      const wistiaRegex = /(?:wistia\.(?:com|net)\/(?:medias|embed\/iframe)\/)([a-zA-Z0-9_-]+)/;
      const match = video.wistiaUrl.match(wistiaRegex);
      const videoId = match ? match[1] : null;

      if (!videoId) return null;

      // Wistia iframe embed. Params reference:
      // https://wistia.com/support/developers/embed-options#playerParameters
      const params = new URLSearchParams({
        autoPlay: autoPlay ? 'true' : 'false',
        muted: muted ? 'true' : 'false',
        loop: loop ? 'true' : 'false',
        controlsVisibleOnLoad: controls ? 'true' : 'false',
        playbar: controls ? 'true' : 'false',
        smallPlayButton: 'true'
      }).toString();

      return (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={`https://fast.wistia.net/embed/iframe/${videoId}?${params}`}
            title="Wistia video player"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          ></iframe>
        </div>
      );
    } else if (videoType === 'mp4' && videoFile?.asset?.url) {
      return (
        <div className="aspect-video w-full overflow-hidden rounded-lg relative">
          {thumbnail?.asset?.url && !isPlaying && (
            <div 
              className="absolute inset-0 bg-cover bg-center cursor-pointer flex items-center justify-center"
              style={{ backgroundImage: `url(${thumbnail.asset.url})` }}
              onClick={handlePlayPause}
            >
              <div className="w-16 h-16 bg-primary-headline-emphasis rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                </svg>
              </div>
            </div>
          )}
          <video
            ref={videoRef}
            src={videoFile.asset.url}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            controls={controls && isPlaying}
            className="h-full w-full"
            onClick={handlePlayPause}
          />
        </div>
      );
    }

    return null;
  };

  return video && (
    <div className={containerStyle({ alignment: 'center' })}>
      <div className="flex w-full flex-col gap-8 items-center text-center">
        <div className={videoWidthClass}>
          {renderVideo()}
        </div>
      </div>
    </div>
  );
};

export default VideoBlock;
