import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider, App } from "antd";
import theme from "@/theme/themeConfig";
import AntdRegistry from "@/lib/providers/AntdRegistry";
import TRPCProvider from "@/lib/trpc/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AA Comfort - Premium Chauffeur Service",
  description:
    "Book luxury taxis and chauffeur services for airport transfers, corporate travel, and special events. Experience comfort and style with AA Comfort.",
  icons: {
    icon: "/images/logo.ico",
  },
};

import Loader from "@/components/ui/Loader";
import NavigationProvider from "@/lib/providers/NavigationProvider";
import GoogleMapsProvider from "@/lib/providers/GoogleMapsProvider";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProvider>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <App>
                <GoogleMapsProvider>
                  <NavigationProvider>
                    <Loader />
                    <ConditionalLayout>{children}</ConditionalLayout>
                  </NavigationProvider>
                </GoogleMapsProvider>
              </App>
            </ConfigProvider>
          </AntdRegistry>
        </TRPCProvider>
      </body>
    </html>
  );
}
