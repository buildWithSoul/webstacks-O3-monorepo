import { AccordionItemProps } from "../../../molecules/accordion";


export const getFaqSchema = (accordionItems: AccordionItemProps[], schemaName?: string | null) => {
  const Accordion = accordionItems.map(item => ({
    '@type': 'Question',
    name: item?.label || '',
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.content ,
    },
  }));

  return {
    name: schemaName || 'Frequently Asked Questions',
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Accordion,
  };
};
