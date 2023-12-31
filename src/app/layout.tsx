import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SideNav from "@/components/SideNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggleButton from "@/components/ThemeToggleButton";

const inter = Inter({ subsets: ["latin"] });

/* export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
} */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="grid grid-cols-10 container">
            <nav className="col-span-0 md:col-span-2">
              <SideNav />
            </nav>
            <div className="col-span-10 md:col-span-7 pl-4">{children}</div>
            <Toaster />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
