'use client';


import type { FC } from 'react';
import { StoryblokNavigationInnerItem } from '../../../../../types/storyblok';
import Link from 'next/link';
import { toggleMobileMenu } from '../../store';
import { Icon } from '../../../../atoms';

const NavItem: FC<StoryblokNavigationInnerItem & { isMobile?: boolean; selected?: boolean; fullWidth?: boolean }> = ({ icon, link, description, label, isMobile, selected, fullWidth }) => (
  <Link
    href={link as any}
    className={`group flex ${fullWidth ? 'w-full' : 'w-full'} gap-2 rounded p-2 hover:bg-navlink-active transition-colors ${selected ? 'bg-navlink-active' : ''}`}
    onClick={() => isMobile && toggleMobileMenu()}
  >
    {icon && (
      <span className="flex size-6 basis-6 grow-0 shrink-0 items-center justify-center">
        <Icon 
          icon={icon} 
          size={24} 
          strokeWidth={0} 
          spriteType={icon.startsWith('brand-') ? 'brand' : 'ui'}
        />
      </span>
    )}
    <div className="flex flex-col pt-0.5">
      {(label || link?.label) && <span className="text-sm font-semibold text-heading group-hover:text-link-hover">{label || link?.label}</span>}
      {description && <span className="text-sm leading-normal text-body">{description}</span>}
    </div>
  </Link>
);

export default NavItem;
