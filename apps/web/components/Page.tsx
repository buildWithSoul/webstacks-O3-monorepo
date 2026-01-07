import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

export  function Page({ blok }:{blok:any}) {
  return (
    <main>
      {blok.body?.map((nestedBlok : any) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}