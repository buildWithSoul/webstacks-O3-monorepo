import { Content, Item, Root, Trigger } from '@radix-ui/react-accordion';


import type { FC } from 'react';
import { Icon } from '../../atoms';
import { RichText } from '../richText/richText';

export type AccordionItemProps = {
  _type: string;
  _key: string;
  label?: string;
  content?:  any;
};
export interface AccordionOrganismProps {
  items: AccordionItemProps[] | any[];
}

const  AccordionOrganism: FC<AccordionOrganismProps> = ({ items }) => (
  <Root
    type="single"
    collapsible
    className="flex w-full flex-col gap-4 mx-auto max-w-[976px]"
  >
    {items?.map(item => (
        <Item
          key={item._key}
          value={item._key}
          className="rounded-lg border border-secondary bg-accordion-default data-[state=open]:bg-accordion-selected"
        >
          <Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 outline-hidden px-6 py-4 sm:py-6">
            <span className="block w-fit text-left text-lg font-medium text-heading">
              {item.label}
            </span>
            <span className="relative flex size-6 shrink-0 grow-0 basis-6 icon-button">
              <Icon
                icon="plus"
                size={24}
                className="absolute top-1/2 left-1/2 w-6 -translate-1/2 transition-all group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-0 icon-link"
              />
              <Icon
                icon="minus"
                size={24}
                className="absolute top-1/2 left-1/2 w-6 -translate-1/2 rotate-180 opacity-0 transition-all group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100 icon-link"
              />
            </span>
          </Trigger>
          <Content className="overflow-hidden data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down">
            <div className="px-6 pb-4">
              {item.content && (
                // Check if it's Storyblok rich text (has type property) or Sanity PortableText (array)
                typeof item.content === 'object' && 'type' in item.content
                  ? <RichText doc={item.content}  />
                  : <RichText doc={item.content}  />
              )}
            </div>
          </Content>
        </Item>
      ))}
  </Root>
);

export default AccordionOrganism;
