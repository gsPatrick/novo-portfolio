import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Patrick Siqueira | Desenvolvedor Full Stack & Especialista Next.js | CodeByPatrick",
  description: "Portfólio de Patrick Siqueira (Patrick.Developer). Especialista em criar experiências digitais de alto impacto com Next.js, React e IA. Conheça meus projetos como Auttoma, Tersio Idbas e G5 Futebol.",
  keywords: ["Patrick Siqueira", "Patrick Dev", "Patrick.Developer", "CodeByPatrick", "Desenvolvedor Full Stack", "Next.js Specialist", "Freelance Developer Brasil"],
  authors: [{ name: "Patrick Siqueira" }],
  openGraph: {
    title: "Patrick Siqueira | High-Impact Full Stack Developer",
    description: "Transformando ideias em interfaces cinematográficas e sistemas robustos.",
    url: "https://codebypatrick.com",
    siteName: "CodeByPatrick",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Siqueira | Patrick.Developer",
    description: "Desenvolvedor Full Stack focado em performance e design premium.",
  },
  alternates: {
    canonical: "https://codebypatrick.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Patrick Siqueira",
  "alternateName": ["Patrick Dev", "Patrick.Developer", "CodeByPatrick"],
  "url": "https://codebypatrick.com",
  "jobTitle": "Full Stack Developer",
  "knowsAbout": ["Next.js", "React", "Node.js", "UI/UX Design", "Software Engineering"],
  "sameAs": [
    "https://github.com/gsPatrick",
    "https://wa.me/5571982862912"
  ]
};

import Header from "@/Components/Layout/Header/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main id="content-root">
          {children}
        </main>
      </body>
    </html>
  );
}
