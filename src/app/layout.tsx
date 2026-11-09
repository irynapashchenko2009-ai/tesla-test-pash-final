import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fonts.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "TESLA MODEL Ω // NEON DRIVE",
  description:
    "The new Tesla Model Ω — 1,020 hp, 0–100 km/h in 2.1 s, 650 km range, Autopilot X. The future is already here — and it glows in the dark.",
  keywords: ["Tesla", "Model Ω", "electric car", "cyberpunk", "Autopilot", "Supercharger"],
  openGraph: {
    title: "TESLA MODEL Ω // NEON DRIVE",
    description: "The electric future, rendered in neon",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#03010a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#03010a] text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
