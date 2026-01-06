'use client';
import { cva } from 'class-variance-authority';
import useHeaderStore, { toggleMobileMenu } from '../../store';

export const hamburgerLineStyle = cva(
  ['absolute left-0 block h-0.5 w-full rotate-0 bg-current transition-all duration-300'],
  {
    variants: {
      line: {
        0: ['top-0 group-aria-[expanded=true]:top-2 group-aria-[expanded=true]:rotate-[135deg]'],
        1: ['top-2 group-aria-[expanded=true]:-left-5 group-aria-[expanded=true]:opacity-0'],
        2: [
          'top-4 group-aria-[expanded=false]:left-1/3 group-aria-[expanded=false]:w-2/3 group-aria-[expanded=true]:top-2 group-aria-[expanded=true]:rotate-[-135deg]',
        ],
      },
    },
  },
);

const Hamburger = () => {
  const open = useHeaderStore(state => state.mobileMenuOpen);

  return (
    <button
      tabIndex={0}
      onClick={toggleMobileMenu}
      className="group relative flex h-4 w-6 shrink-0 basis-6 cursor-pointer items-center justify-center xl:hidden"
      aria-expanded={open}
    >
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <span key={`line-${index + 1}`} className={hamburgerLineStyle({ line: index as 0 | 1 | 2 })} />
        ))}
    </button>
  );
};

export default Hamburger;
