'use client';

import { Item, Content as RadContent, Root } from '@radix-ui/react-accordion';
import { useEffect, useRef } from 'react';



import type { FC, ReactNode } from 'react';
import useHeaderStore from '../../../store';
import useHeaderHeight from '../../../../../../lib/utils/hooks/useHeaderHeight';

const MainMobileAccordion: FC<{ children: ReactNode }> = ({ children }) => {
  const open = useHeaderStore(state => state.mobileMenuOpen),
    headerHeight = useHeaderHeight(),
    menuRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);

  return (
    <Root
      type="single"
      collapsible
      value={open ? 'mobile-open' : ''}
      className="absolute top-(--header-height) left-0 z-50 w-full select-none bg-white xl:hidden"
      style={{ '--header-height': `${headerHeight}px` } as React.CSSProperties}
    >
      <Item ref={menuRef} value="mobile-open">
        <RadContent className="overflow-auto h-[calc(calc(100dvh_-_var(--header-height)))] bg-neutrals-50 shadow-lg data-[state=closed]:animate-(--animate-accordion-slide-up) data-[state=open]:animate-(--animate-accordion-slide-down)">
          <div className="sm:pb-8">{children}</div>
        </RadContent>
      </Item>
    </Root>
  );
};

export default MainMobileAccordion;
