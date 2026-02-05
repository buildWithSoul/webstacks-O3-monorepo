import { storyblokEditable } from '@storyblok/react/rsc';

type HeroProps = {
  header?: string;
  description?: string;
  alignment?: 'center' | 'left' | 'right';
  subDescription? : string;
};

export const Hero = ({ header, description, alignment = 'center', ...blok }: HeroProps) => {
  return (
    <section
      {...storyblokEditable(blok)}
      className="min-h-[20vh] flex items-center bg-gradient-to-br from-slate-900 to-slate-950 px-6"
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-black md:text-6xl">
          {header}
        </h1>

        <p className="mb-10 text-lg leading-relaxed text-slate-300">
          {description}
        </p>

    
      </div>
    </section>
  );
};