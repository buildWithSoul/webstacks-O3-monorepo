import Link from 'next/link'
import { Icon } from '../../atoms';

interface ShareButtonsProps {
  pathName: string;
  title: string;
}

export default function ShareButtons({ pathName, title }: ShareButtonsProps) {
  return (
    <div className="flex flex-col gap-4">
      <Link 
        href={`https://twitter.com/intent/tweet?url=${pathName}&text=${title}`} 
        className="flex items-center justify-center w-12 h-12 rounded-lg bg-background border border-stroke hover:bg-muted transition-colors"
        aria-label="Share on Twitter"
      >
        <Icon icon="twitter-x" size={20} className="text-body" />
      </Link>
      <Link 
        href={`https://www.facebook.com/sharer.php?u=${pathName}`} 
        className="flex items-center justify-center w-12 h-12 rounded-lg bg-background border border-stroke hover:bg-muted transition-colors"
        aria-label="Share on Facebook"
      >
        <Icon icon="facebook" size={20} className="text-body" />
      </Link>
      <Link 
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${pathName}&title=${title}`} 
        className="flex items-center justify-center w-12 h-12 rounded-lg bg-background border border-stroke hover:bg-muted transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Icon icon="linkedin" size={20} className="text-body" />
      </Link>
      <Link 
        href={`mailto:?subject=${title}&body=${pathName}`} 
        className="flex items-center justify-center w-12 h-12 rounded-lg bg-background border border-stroke hover:bg-muted transition-colors"
        aria-label="Share via Email"
      >
        <Icon icon="mail-01" size={20} className="text-body" />
      </Link>
    </div>
  );
}
