import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Zerythous — Custom Software & AI Architecture",
  description: "Zerythous architects and engineers high-performance software, AI systems, scalable digital products, and intelligent applications.",
  openGraph: {
    title: "Zerythous — Custom Software & AI Architecture",
    description: "Zerythous architects and engineers high-performance software, AI systems, scalable digital products, and intelligent applications.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zerythous — Custom Software & AI Architecture",
    description: "Zerythous architects and engineers high-performance software, AI systems, scalable digital products, and intelligent applications.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('zerythous-theme');
                  var pref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var theme = saved || pref;
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${outfit.variable} ${syne.variable} font-sans bg-background text-foreground antialiased selection:bg-accent-purple/30 selection:text-white transition-colors duration-300`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
