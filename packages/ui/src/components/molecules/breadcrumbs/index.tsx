'use client';

import { usePathname } from 'next/navigation';

import type { FC } from 'react';
import { Button, Icon, Link } from '../../atoms';
import generateBreadcrumbs from './utils/generateBreadcrumbs';

interface BreadcrumbProps {
  breadcrumbTitle?: string;
  breadcrumbItems?: Array<{
    label: string;
    link: string | {
      _ref: string;
      _type: string;
      slug?: {
        current: string;
      };
    };
  }>;
  variant?: 'default' | 'back';
}

const Deliminator = () => (
  <div className="text-eyebrow">
    <Icon icon="chevron-right" size={14} className="shrink-0 text-eyebrow" />
  </div>
);

const BreadcrumbLink = ({ link, label }: { link: string; label: string }) => (
  <>
    <Link href={link} className="text-nowrap focus-outline-primary text-body">
      {label}
    </Link>
    <Deliminator />
  </>
);

const Breadcrumbs: FC<BreadcrumbProps> = ({ breadcrumbTitle, breadcrumbItems, variant = 'default' }) => {
  const pathname = usePathname();
  // Use custom breadcrumb items if provided, otherwise generate from pathname
  const generatedBreadcrumbs = generateBreadcrumbs(pathname || '');
  const breadcrumbs = breadcrumbItems
    ? breadcrumbItems.map((item, index) => {
        // Handle reference fields by extracting the slug
        let linkPath = '/';
        if (typeof item.link === 'string') {
          linkPath = item.link;
        } else if (item.link && typeof item.link === 'object' && item.link.slug) {
          linkPath = `/${item.link.slug.current}`;
        }
        
        return {
          id: `custom-breadcrumb-${index}`,
          link: linkPath,
          label: item.label,
        };
      })
    : generatedBreadcrumbs;

  // Render "back" variant as a button
  if (variant === 'back' && breadcrumbs.length > 0) {
    const firstBreadcrumb = breadcrumbs[0];
    return (
      <div className="mb-8">
        <Button 
          link={firstBreadcrumb?.link}
          mode="link"
          tone="primary"
          leadingIcon="arrow-left"
          size="md"
        >
          {firstBreadcrumb?.label}
        </Button>
      </div>
    );
  }

  // Default breadcrumb rendering
  return (
    <div className="flex items-center gap-3">
      <Link href="/" className="text-link">
        <Icon icon="home-02" size={20} className="stroke-2" />
      </Link>
      <Deliminator />
      {breadcrumbs.map(({ id, link, label }, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return isLast ? (
          <span key={id} className="truncate text-link">
            {breadcrumbTitle || label}
          </span>
        ) : (
          <BreadcrumbLink key={id} link={link} label={label} />
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
