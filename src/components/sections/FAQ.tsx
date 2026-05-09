import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EyebrowHeading } from "@/components/site/EyebrowHeading";
import { CurvedDivider } from "@/components/site/CurvedDivider";
import { faqs } from "@/lib/site-config";

export function FAQ() {
  return (
    <>
      <CurvedDivider variant="cream-to-taupe" />
      <section className="bg-taupe py-12 pb-20" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <EyebrowHeading
            eyebrow="Frequently Asked Questions"
            title="What to expect"
            align="center"
            titleSize="lg"
            className="mb-12"
          />
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
