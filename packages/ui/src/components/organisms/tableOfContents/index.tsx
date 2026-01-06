'use client';
import { Link as ScrollLink } from 'react-scroll';
import { twMerge } from 'tailwind-merge';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import useTocStore, { setActiveItem } from './store';


import { FC, useEffect, useRef, useState } from 'react';
import { generateSlug as baseGenerateSlug} from '../../../utils/slugs';
import { Icon } from '../../atoms';

// Helper function to generate TOC-specific slugs that match heading IDs
const generateSlug = (text: string): string => {
  const base = baseGenerateSlug(text);
  return `toc-${base}`;
};

interface TOCItem {
  key: string;
  title: string;
  originalTitle: string;
  level: number;
  sectionId: string;
  hidden: boolean;
  order: number;
}

interface TableOfContentsProps {
  label?: string;
  article: {
    body: any[];
    tableOfContents?: TOCItem[];
  };
}

const ScrollItems: FC<{ items: TOCItem[] }> = ({ items }) => {
  const activeItem = useTocStore(state => state.activeItem);
  const visibleItems = items.filter(item => !item.hidden);

  const handleActiveItem = (index: number) => {
    // Use requestAnimationFrame to batch the update
    requestAnimationFrame(() => {
      setActiveItem(index);
    });
    const tocEl = document.getElementById('table-of-contents');
    if (tocEl) {
      tocEl.classList.add('scrolling');
      setTimeout(() => {
        tocEl.classList.remove('scrolling');
      }, 1200);
    }
  };

  // Filter out hidden items first

  return (
    <ul className="flex flex-col">
      {items.map((item, index) => {
        const originAnchorLink = generateSlug(item?.originalTitle || item?.title || '');

        return item.hidden ? (
          <></>
        ) : (
          <li
            key={item.key}
            className={`text-base transition-all duration-200 hover:bg-secondary ${
              index < visibleItems.length - 1 ? 'border-b border-primary' : ''
            }`}
            role="menuitem"
          >
            <ScrollLink
              to={originAnchorLink || item.sectionId}
              data-url={originAnchorLink || item.sectionId}
              aria-current={index === activeItem ? 'location' : undefined}
              smooth={true}
              duration={300}
              offset={-180}
              className={`cursor-pointer block px-4 py-2.5 transition-colors ${
                index === activeItem ? 'text-heading font-medium border-l-3 border-tabbed-switcher-active pl-[13px]' : 'text-heading'
              }`}
              onClick={() => handleActiveItem(index)}
            >
              {/* Use title from Sanity if available, otherwise use originalTitle */}
              {item.title !== item.originalTitle ? item.title : item.originalTitle}
            </ScrollLink>
          </li>
        );
      })}
    </ul>
  );
};

const TableOfContents: FC<TableOfContentsProps> = ({ label, article }) => {
  // Handle both array and object formats
  const body = Array.isArray(article) ? article : article?.body;
  const tableOfContents = Array.isArray(article) ? [] : article?.tableOfContents;
  const [expanded, setExpended] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  if (!article) {
    return null;
  }

  // Generate TOC items from body if not provided
  const generateTocItems = (blocks: any[]) => {
    const items =
      blocks
        ?.filter(block => {
          const isHeading = block.style === 'h2';
          const hasText = block.children?.[0]?.text;
          return isHeading && hasText;
        })
        ?.map((block, index) => {
          const text = block.children[0].text;
          const item = {
            key: block._key,
            title: text, // This will be overridden by custom title if set in Sanity
            originalTitle: text, // This is always the original heading text
            level: block.style === 'h2' ? 2 : 3,
            sectionId: generateSlug(text),
            hidden: false,
            order: index,
          };
          return item;
        }) || [];
    return items;
  };

  // Use Sanity TOC data directly if available
  const tocItems = tableOfContents?.length ? tableOfContents : generateTocItems(body || []);

  // Track active heading on scroll
  useEffect(() => {
    if (!tocItems?.length) return;

    const headings = tocItems
      .filter(item => !item.hidden)
      .map(item => {
        const originAnchorLink = generateSlug(item?.originalTitle || item?.title || '');
        return document.getElementById(originAnchorLink || item.sectionId);
      })
      .filter((el): el is HTMLElement => el !== null);

    const handleScroll = () => {
      const tocEl = document.getElementById('table-of-contents');
      if (tocEl && tocEl.classList.contains('scrolling')) {
        return;
      }
      const scrollPosition = 200; // Significantly increased offset to account for header height

      // Find the current heading
      const currentHeading = headings.reduce((acc, heading) => {
        if (heading.getBoundingClientRect().top <= scrollPosition) {
          return heading;
        }
        return acc;
      }, headings[0]);

      if (currentHeading) {
        const index = tocItems.findIndex(
          item =>
            !item.hidden &&
            (item.sectionId === currentHeading.id ||
              item?.originalTitle === currentHeading.innerText ||
              item?.title === currentHeading.innerText),
        );
        if (index !== -1) {
          setActiveItem(index);
          const anchorEl = document.querySelector(`[data-url=${currentHeading.id}]`)?.parentElement;
          const scrollOffset = (anchorEl?.offsetTop || 0) - 45;
          if (tocRef.current) {
            tocRef.current.scrollTo({
              top: scrollOffset,
              behavior: 'smooth',
            });
          }
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  useEffect(() => {
    setTimeout(() => {
      const anchorEl = document.querySelector('[aria-current=location]')?.parentElement;
      const scrollOffset = (anchorEl?.offsetTop || 0) - 45;
      if (tocRef.current) {
        tocRef.current.scrollTo({
          top: scrollOffset,
          behavior: 'smooth',
        });
      }
    }, 300);
  }, [expanded]);

  // Don't render if no items
  if (!tocItems?.length) {
    return null;
  }

  // If no TOC items and no body content, don't render anything
  if (!tocItems.length && (!article.body || !article.body.length)) {
    return null;
  }

  // Convert TOC items to dropdown format, excluding hidden items

  const dropdownItems = tocItems
    .filter(item => !item.hidden)
    .map(item => ({
      label: item.title !== item.originalTitle ? item.title : item.originalTitle,
      value: item.sectionId,
    }));

  const handleChange = (value: string) => {
    const index = tocItems.findIndex(item => item.sectionId === value);
    if (index !== -1) {
      setActiveItem(index);
      // Get the element's position
      const element = document.getElementById(value);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 220;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav aria-label="Table of contents" className="w-full dark">
      <div className="lg:hidden">
        <p className="text-heading border-b border-primary p-4 text-xs font-medium uppercase leading-normal">
          {label || 'Table of contents'}
        </p>
        {dropdownItems.length > 0 && (
          <div className="pt-4">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="w-full rounded-[4px] p-3.5 text-sm leading-normal focus:outline-none transition appearance-none bg-secondary hover:bg-secondary/80 focus:ring-1 focus:ring-hyperlink flex items-center justify-between border border-primary">
                <span className="truncate text-left flex-1 text-heading">Jump to section</span>
                <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 text-heading" />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="w-[calc(100vw-32px)] min-w-[200px] overflow-auto rounded-md bg-secondary border border-primary p-1 shadow-lg transition-all duration-200 ease-in-out transform origin-top-left max-h-[--radix-popper-available-height]"
                  align="start"
                  sideOffset={4}
                >
                  {dropdownItems.map((item, index) => (
                    <DropdownMenu.Item
                      key={item.value}
                      className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-heading outline-none transition-colors hover:bg-primary focus:bg-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      onClick={() => handleChange(item.value)}
                    >
                      {item.label}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        )}
      </div>
      <div className="hidden border border-primary rounded-lg overflow-hidden bg-secondary-background lg:block">
        <p className="text-heading border-b border-primary p-4 text-xs font-medium uppercase leading-normal">
          {label || 'Table of contents'}
        </p>
        {dropdownItems.length > 0 && (
          <div
            ref={tocRef}
            id="table-of-contents"
            className={twMerge(
              'relative scrollbar-hidden overflow-auto transition-all duration-300',
              expanded ? 'max-h-[calc(100vh-300px)]' : 'max-h-[224px]',
            )}
          >
            <ScrollItems items={tocItems} />
            <button
              className="sticky bottom-0 flex w-full p-2 items-center justify-center bg-secondary-background border-t border-primary text-heading transition-colors"
              onClick={() => setExpended(!expanded)}
            >
              <Icon icon="chevron-up" className={expanded ? 'rotate-0' : 'rotate-180'} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TableOfContents;
