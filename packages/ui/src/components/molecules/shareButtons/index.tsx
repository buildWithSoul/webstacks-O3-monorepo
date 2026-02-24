import Link from 'next/link'
import { Icon } from '../../atoms';

interface ShareButtonsProps {
  pathName: string;
  title: string;
}

export default function ShareButtons({ pathName, title }: ShareButtonsProps) {
  return (
    <div className="flex  gap-8">
       <Link 
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${pathName}&title=${title}`} 
        aria-label="Share on LinkedIn"
      >
        <Icon icon="linkedin" size={24} className="text-body rounded-xs" />
      </Link>
        <Link 
        href={`https://www.facebook.com/sharer.php?u=${pathName}`} 
        aria-label="Share on Facebook"
      >
        <Icon icon="facebook" size={24} className="text-body" />
      </Link>
      <Link 
        href={`https://twitter.com/intent/tweet?url=${pathName}&text=${title}`} 
        aria-label="Share on Twitter"
      >
        <Icon icon="twitter" strokeWidth={0.5} size={24} className="text-body" />
      </Link>
    
     
      <Link 
        href={`mailto:?subject=${title}&body=${pathName}`} 
        aria-label="Share via Email"
      >
        <Icon icon="mail-01" size={24} className="text-body" />
      </Link>
    </div>
  );
}
