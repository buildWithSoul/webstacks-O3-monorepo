import { AccordionItem } from "../../../organisms/accordion/accordion";


export const getFaqSchema = (accordionItems: AccordionItem[], schemaName?: string | null) => {
  const Accordion = accordionItems.map(item => ({
    '@type': 'Question',
    name: item?.title || '',
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
