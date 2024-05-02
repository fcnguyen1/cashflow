import { Inter, Albert_Sans, Barlow } from "next/font/google";
import "./globals.css";

const albert_init = Albert_Sans({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-albert",
});

const barlow_init = Barlow({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-barlow",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlowWise: Your Cashflow Companion",
  description: "Effortlessly determine cashflow and retire early",
};

// className={albert_init.className}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
