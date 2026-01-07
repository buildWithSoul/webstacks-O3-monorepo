import { storyblokEditable } from '@storyblok/react/rsc';

export const Hero = ({ blok }: { blok: any }) => {
  return (
    <section
      {...storyblokEditable(blok)}
      className="min-h-[80vh] flex items-center bg-gradient-to-br from-slate-900 to-slate-950 px-6"
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
          {blok.headline}
        </h1>

        <p className="mb-10 text-lg leading-relaxed text-slate-300">
          {blok.subtext}
        </p>

        <a
          href={blok.url?.cached_url}
          className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:bg-indigo-500 hover:-translate-y-0.5 hover:shadow-lg"
        >
          {blok.label}
        </a>
      </div>
    </section>
  );
};

