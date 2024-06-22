import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { CustomToaster } from "@/components/common/Toaster";
import QueryProvider from "@/providers/QueryProvider";
import { getSession } from "@/action/auth.action";

// const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LedgerLite",
  description:
    "LedgerLite: Simplify your small shop's account and inventory management with our intuitive web app. Easily track sales, manage stock, and stay on top of your finances with LedgerLite. Perfect for small businesses looking to streamline their operations and boost efficiency.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  console.log("SESSION FROM LAYOUT", session);
  return (
    <html suppressHydrationWarning className="scroll-smooth" lang="en">
      <body className={`${nunito.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <CustomToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
