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
    <section className="w-full py-16 mb-20">
      <div className="w-[95%] max-w-[1280px] mx-auto">
        <h2 className="text-6xl font-bold uppercase font-sans text-[#365a41] my-10 text-center">
          FAQs
        </h2>

        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              type="single"
              collapsible
              className="bg-[#365a41] rounded-md"
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-white font-semibold px-5 py-6 font-sans hover:bg-[#2d4634] rounded-xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-200 px-5 py-3 font-sans border-t border-white/20">
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
