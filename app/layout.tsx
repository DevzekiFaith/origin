import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GamificationProvider } from "./contexts/GamificationContext";
import { SocialProvider } from "./contexts/SocialContext";
import { CommunityProvider } from "./contexts/CommunityContext";
import { RecommendationProvider } from "./contexts/RecommendationContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import { OfflineProvider } from "./contexts/OfflineContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SyncProvider } from "./contexts/SyncContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import { TeacherProvider } from "./contexts/TeacherContext";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { AIRecommendationProvider } from "./contexts/AIRecommendationContext";
import { PodcastProvider } from "./contexts/PodcastContext";
import { ToastProvider } from "./contexts/ToastContext";
import { CartProvider } from "./contexts/CartContext";
import SimplifiedHeader from "./components/layout/SimplifiedHeader";
import SimplifiedFooter from "./components/layout/SimplifiedFooter";
import WhatsAppWidget from "./components/ui/WhatsAppWidget";
import { Analytics } from "@vercel/analytics/next";


const geistSans = { variable: "font-sans" };
const geistMono = { variable: "font-mono" };

export const metadata: Metadata = {
  metadataBase: new URL('https://origin.com.ng'),
  title: {
    default: "Origin by The Becoming Institute — Practical Education for Becoming",
    template: "%s | Origin by The Becoming Institute",
  },
  description: "Master life's essential skills with human architecture, accelerator programs, books, workshops, and practical learning designed for personal transformation.",
  keywords: [
    "Origin",
    "origin.com.ng",
    "The Becoming Institute",
    "Human Architecture",
    "Practical Education",
    "The Architecture of Becoming",
    "JUMPSTART Accelerator",
    "Fit-For-Profit Workshop",
    "Money Farming",
    "Zeki Ubor",
    "Personal Mastery",
    "Solution Mindset",
    "Decision Making",
    "Leadership Skills",
    "Character Development",
  ],
  authors: [{ name: "The Becoming Institute", url: "https://origin.com.ng" }],
  creator: "The Becoming Institute",
  publisher: "The Becoming Institute",
  alternates: {
    canonical: "https://origin.com.ng",
  },
  verification: {
    google: "MN48KT3kEWBUkOoWVvSu3vSvzm01TnP3IuFQE45asKw",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/origin.png",
    apple: "/origin.png",
  },
  openGraph: {
    title: "Origin by The Becoming Institute — Practical Education for Becoming",
    description: "Practical education for becoming. Transformative learning designed around human architecture.",
    url: "https://origin.com.ng",
    siteName: "Origin by The Becoming Institute",
    images: [
      {
        url: "/jumpstart_cover.png",
        width: 1200,
        height: 630,
        alt: "Origin by The Becoming Institute — Practical Education for Becoming",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Origin by The Becoming Institute — Practical Education for Becoming",
    description: "Practical education for becoming. Transformative learning designed around human architecture.",
    images: ["/jumpstart_cover.png"],
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://origin.com.ng/#organization",
      "name": "Origin by The Becoming Institute",
      "url": "https://origin.com.ng",
      "logo": "https://origin.com.ng/origin.png",
      "description": "Practical education for becoming through human architecture and transformative learning programs.",
      "sameAs": [
        "https://origin.com.ng"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://origin.com.ng/#website",
      "url": "https://origin.com.ng",
      "name": "Origin by The Becoming Institute",
      "description": "Master life's essential skills with human architecture.",
      "publisher": {
        "@id": "https://origin.com.ng/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://origin.com.ng/store?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <UserProvider>
          <ThemeProvider>
            <GamificationProvider>
              <SocialProvider>
                <CommunityProvider>
                  <RecommendationProvider>
                    <ProgressProvider>
                      <OfflineProvider>
                        <LanguageProvider>
                          <SyncProvider>
                            <PaymentProvider>
                              <TeacherProvider>
                                <AccessibilityProvider>
                                  <AIRecommendationProvider>
                                    <PodcastProvider>
                                      <ToastProvider>
                                        <CartProvider>
                                          <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#121212] text-white">
                                            <SimplifiedHeader />
                                            <main className="flex-1">
                                              {children}
                                            </main>
                                            <SimplifiedFooter />
                                            <WhatsAppWidget />
                                            <Analytics />
                                          </div>
                                        </CartProvider>
                                      </ToastProvider>
                                    </PodcastProvider>
                                  </AIRecommendationProvider>
                                </AccessibilityProvider>
                              </TeacherProvider>
                            </PaymentProvider>
                          </SyncProvider>
                        </LanguageProvider>
                      </OfflineProvider>
                    </ProgressProvider>
                  </RecommendationProvider>
                </CommunityProvider>
              </SocialProvider>
            </GamificationProvider>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
