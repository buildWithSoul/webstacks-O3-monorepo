import { twMerge } from "tailwind-merge";
import { SanityImage, SanityRichImage, SanityVideo } from "../types/sanity";
import { Image, LottieAnimation, MediaForm, VideoBlock } from "../components";
import Video from "../components/molecules/video";



interface GetMediaOptions {
  mediaType?: string;
  featuredImage?: SanityImage | SanityRichImage;
  media?: SanityVideo;
  lottieFile?: {
    asset?: {
      url?: string;
    };
  };
  formConfig?: {
    formId?: string;
    buttonText?: string;
    buttonColor?: string;
    headingText?: string;
    subheadingText?: string;
    redirectUrl?: string;
    formValues?: Array<{
      key: string;
      value: string;
    }>;
  };
  hasShadow?: boolean;
  aspectRatio?: string;
  playButtonPosition?: 'center' | 'bottom-left';
}

export const getMedia = (options: GetMediaOptions) => {
  const {
    mediaType,
    featuredImage,
    media,
    lottieFile,
    formConfig,
    hasShadow = false,
    aspectRatio,
    playButtonPosition,
  } = options;

  switch (mediaType) {
    case 'image':
      {
        // Normalize new richImage to the plain image props expected by <Image/>
        const isRich = (featuredImage as SanityRichImage | undefined)?._type === 'richImage';
        const baseImage = isRich
          ? (featuredImage as SanityRichImage).image
          : (featuredImage as SanityImage | undefined);
        const altText = isRich
          ? (featuredImage as SanityRichImage).alt || (featuredImage as SanityRichImage).image?.alt
          : (featuredImage as SanityImage | undefined)?.alt;

        return (
          baseImage && (
            <Image
              {...baseImage}
              noFill
              objectCover
              unsetMaxWidth
              alt={altText}
              className={
                twMerge(
                  'w-full overflow-hidden rounded-lg [&_img]:object-center lg:rounded-2xl',
                  hasShadow ? 'shadow-image' : '',
                )
              }
            />
          )
        );
      }
    case 'video':
      return media && <Video {...media} aspectRatio={aspectRatio} playButtonPosition={playButtonPosition} />;
    case 'lottie':
      return lottieFile && <LottieAnimation file={lottieFile} />;
    case 'media':
      switch (media?._type) {
        case 'video':
          return media && <VideoBlock {...media} aspectRatio={aspectRatio} playButtonPosition={playButtonPosition} />;
        default:
          return null;
      }
    case 'form':
      return formConfig?.formId && <MediaForm formConfig={formConfig} />;
    default:
      return null;
  }
};

// Legacy function signature for backward compatibility
export const getMediaLegacy = (
  mediaType?: string,
  featuredImage?: SanityImage | SanityRichImage,
  media?: SanityVideo,
  lottieFile?: {
    asset?: {
      url?: string;
    };
  },
  hasShadow = false,
  aspectRatio?: string,
  playButtonPosition?: 'center' | 'bottom-left',
) => {
  return getMedia({
    mediaType,
    featuredImage,
    media,
    lottieFile,
    hasShadow,
    aspectRatio,
    playButtonPosition,
  });
};