import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Origin Store & Resource Catalog",
  description: "Explore The Becoming Institute masterclasses, companion eBooks, Fit for Profit workshops, and human architecture learning resources.",
  openGraph: {
    title: "Origin Store & Resource Catalog | Origin by The Becoming Institute",
    description: "Explore The Becoming Institute masterclasses, companion eBooks, Fit for Profit workshops, and human architecture learning resources.",
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
