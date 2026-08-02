import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Accelerator Masterclasses",
  description: "Browse upcoming live strategy sessions, workshops, webinars, and the JUMPSTART Accelerator program by The Becoming Institute.",
  openGraph: {
    title: "Events & Accelerator Masterclasses | Origin by The Becoming Institute",
    description: "Interactive strategy sessions, workshops, and accelerator masterclasses for human architecture.",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
