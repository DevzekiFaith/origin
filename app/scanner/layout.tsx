import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Scanner & Physical Material Verification",
  description: "Scan physical Origin QR flyers, cards, and learning material to instant-verify credentials or join programs.",
  openGraph: {
    title: "QR Scanner | Origin by The Becoming Institute",
    description: "Scan physical Origin QR flyers, cards, and learning material to instant-verify credentials or join programs.",
  },
};

export default function ScannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
