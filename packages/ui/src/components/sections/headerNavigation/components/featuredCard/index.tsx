
import type { FC } from 'react';
import { StoryblokNavigationSpotlightCard } from '../../../../../types/storyblok';
import MediaCard from './MediaCard';

const FeaturedCard: FC<StoryblokNavigationSpotlightCard> = (props) => {
  return <MediaCard {...props} />;
};

export default FeaturedCard;
