import { Manrope, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Outdoor & Av Ekipmanları",
    template: "%s | Outdoor & Av Ekipmanları",
  },
  description: "Outdoor ve av ekipmanları için premium alışveriş deneyimi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${manrope.variable} ${barlow.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
