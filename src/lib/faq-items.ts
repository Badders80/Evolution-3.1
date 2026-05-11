/**
 * Shared FAQ items used by the homepage and FAQStructuredData.
 * Lifted from page.tsx to enable server-side JSON-LD rendering.
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Who is Evolution Stables?",
    answer:
      "At its core, Evolution Stables is a marketplace built to make buying and selling racehorse ownership stakes simple, transparent, and secure. We use modern tools to make participation easier for anyone — whether you're new to racing or already involved.",
  },
  {
    question: "What is Evolution Stables here to do?",
    answer:
      "We're here to make racehorse ownership work better for everyone. That means creating an easier way to get involved, helping owners unlock value from their horses, and building a system where ownership can move more freely between people.",
  },
  {
    question: "How is Evolution Stables different?",
    answer:
      "We focus on making ownership practical. No long-term lock-ins, no complicated paperwork — just clear terms, flexible options, and the ability to buy or sell stakes when it suits you. Everything is designed around how people want to participate today.",
  },
  {
    question: "What does digital-syndication mean?",
    answer:
      "Digital-syndication is a modern take on a familiar idea. Instead of traditional syndicates managed on paper, ownership stakes are offered and managed online — making them easier to access, track, and trade.",
  },
  {
    question: "Can I trade or sell my stake?",
    answer:
      "Yes. Our marketplace is designed to make ownership more flexible, so you can sell your stake to someone else if you choose. This creates liquidity — something the racing industry has traditionally lacked.",
  },
  {
    question: "What are the risks?",
    answer:
      "Like any regulated investment, racehorse ownership carries some risk. Horses can get injured, performance can vary, and returns are not guaranteed. What matters is that everything on our platform operates under clear rules — with transparent terms, regulated processes, and compliance built in — so you always know what you're investing in and how it's managed.",
  },
];
