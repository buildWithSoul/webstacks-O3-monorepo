"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { twMerge } from "tailwind-merge";
import type { SbBlokData } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";
import { Button, Icon } from "../../atoms";

type StoryblokImage ={
  id: string;
  filename: string;
  alt?: string;
}
type AccordionItem = {
  _uid: string;
  title: string;
  content: React.ReactNode;
  cta?: {
    label: string;
    href: string;
  };
  icon?: StoryblokImage
};

export interface AccordionProps extends SbBlokData {
  items: AccordionItem[];
  colorMode?: "light" | "dark";
  className?: string;
}

export function Accordion({
  items,
  colorMode = "light",
  className,
  ...blok
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className={twMerge("w-full", className)}
      {...storyblokEditable(blok)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item._uid}
          value={item._uid}
          className="border-b border-(--stroke-secondary) flex flex-col gap-(--gaps-16-12-12) p-(--gaps-24-18-18)"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className="
                group flex w-full items-center justify-between gap-3 text-left
                transition-colors

                text-neutral-600

                data-[state=open]:text-(--text-headings-dark)
              "
            >
              <div className="flex items-center gap-4">
                {item.icon && (
  <span
    className="
      shrink-0 transition-opacity
      opacity-50
      group-data-[state=open]:opacity-100
    "
  >
    <img
      src={item.icon.filename}
      alt={item.icon.alt || ''}
      className="h-6 w-6 object-contain"
    />
  </span>
)}


                <span className="text-display-xl">{item.title}</span>
              </div>

              <div
                className="
                cursor-pointer
    flex items-center justify-center rounded-sm p-(--padding-8-6-6) 
    transition-colors               
    bg-transparent 
                
    group-data-[state=open]:bg-(--surface-button-active)
    group-data-[state=open]:text-(--icon-on-accent)
  "
                aria-hidden
              >
              
                <Icon size={24}  className="text-neutral-600 group-data-[state=open]:hidden" icon="plus"/>
                <Icon size={24}  className="text-(--icon-button) hidden group-data-[state=open]:block" icon="minus"/>


              </div>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionPrimitive.Content
            className="
              overflow-hidden
              data-[state=open]:animate-accordion-down
              data-[state=closed]:animate-accordion-up
            "
          >
            <div
              {...storyblokEditable(item as any)}
              data-blok-field="content"
              className=" text-(--text-body-dark) text-sm flex flex-col gap-(--gaps-16-12-12)"
            >
              <div>{item.content}</div>

              {item.cta && (
                <Button mode="link" label={item.cta.label} href={item.cta.href} />
              )}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
