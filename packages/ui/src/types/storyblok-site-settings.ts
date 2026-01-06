// Storyblok site settings types
export interface StoryblokSiteSettings {
  _uid: string;
  component: 'siteSettings';
  siteName: string;
  siteDescription?: string;
  logotypeOnLight?: StoryblokAsset;
  logotypeOnDark?: StoryblokAsset;
  iconOnLight?: StoryblokAsset;
  iconOnDark?: StoryblokAsset;
  openGraphImage?: StoryblokAsset;
}

export interface StoryblokAsset {
  id: number | null;
  alt: string;
  name: string;
  focus: string;
  title: string;
  source: string;
  filename: string;
  copyright: string;
  fieldtype: 'asset';
  meta_data: Record<string, any>;
  is_external_url: boolean;
}
