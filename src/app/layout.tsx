import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Provider/ThemeProvider";
import { CustomToaster } from "@/components/common/Toaster";

// const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LedgerLite",
  description:
    "LedgerLite: Simplify your small shop's account and inventory management with our intuitive web app. Easily track sales, manage stock, and stay on top of your finances with LedgerLite. Perfect for small businesses looking to streamline their operations and boost efficiency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className="scroll-smooth" lang="en">
      <body className={`${nunito.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CustomToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
