"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // Make sure shadcn/ui Accordion is installed

const faqs = [
  {
    question: "What is your 3D modeling process?",
    answer:
      "We start by understanding the project requirements, then create concept sketches, and finally develop high-quality 3D models using industry-standard tools.",
  },
  {
    question: "How fast can I get my 3D assets?",
    answer:
      "Delivery time depends on the complexity of the assets. Simple models can be delivered within 24-48 hours, while complex projects may take longer.",
  },
  {
    question: "Can I request custom modifications?",
    answer:
      "Yes! We accept custom requests and revisions to make sure the 3D assets meet your exact requirements.",
  },
];

const FAQSection = () => {
  return (
    <section className="w-full py-16 pb-30">
      <div className="w-[95%] max-w-[1280px] mx-auto">
        <h2 className="text-5xl max-md:text-3xl font-bold uppercase font-sans orbitron text-center text-white mb-15 max-md:mb-10 pt-10">
          FAQs
        </h2>

        <div className="flex flex-col gap-4 main-container mx-auto">
          {faqs.map((faq, index) => (
  <Accordion
    key={index}
    type="single"
    collapsible
    className="rounded-lg shadow-md"
  >
    <AccordionItem value={`item-${index}`}>
      <AccordionTrigger className="bg-gradient-to-r from-[#4e47af] to-[#4C1D95] text-white exo font-semibold px-5 py-6 font-sans hover:opacity-90 rounded-lg flex justify-center">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="bg-gray-700/20 white-border text-white exo px-5 py-3 font-sans rounded-lg mt-2 text-center">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
))}

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
