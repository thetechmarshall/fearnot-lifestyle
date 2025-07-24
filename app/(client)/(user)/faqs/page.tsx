import Container from "@/components/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsData } from "@/Constants";
import React from "react";

const FaqsPage = () => {
  return (
    <Container className="max-w-4xl sm:px-6 lg:px-8 py-12 space-y-10">
      <h1 className="text-3xl">Frequently Asked Questions</h1>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-0"
      >
        {faqsData?.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="group">
            <AccordionTrigger className="text-left text-lg font-semibold text-darkColor/80 group-hover:text-darkColor hover:no-underline hoverEffect">{faq?.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{faq?.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};

export default FaqsPage;
