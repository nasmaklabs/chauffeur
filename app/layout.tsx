import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import AntdRegistry from "@/lib/providers/AntdRegistry";
import QueryProvider from "@/lib/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxeRide - Premium Chauffeur Service",
  description: "Book luxury taxis and chauffeur services for airport transfers, corporate travel, and special events. Experience comfort and style with LuxeRide.",
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </ConfigProvider>
          </AntdRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
