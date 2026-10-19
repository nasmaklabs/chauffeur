import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ConfigProvider, App } from "antd";
import theme from "@/theme/themeConfig";
import AntdRegistry from "@/lib/providers/AntdRegistry";
import TRPCProvider from "@/lib/trpc/Provider";
import { SITE_URL } from "@/lib/constants/brand";

const inter = Inter({ subsets: ["latin"] });
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-face",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AA Chauffeurs - Premium Chauffeur Service",
    template: "%s | AA Chauffeurs",
  },
  description:
    "Book luxury taxis and chauffeur services for airport transfers, corporate travel, and special events. Experience comfort and style with AA Chauffeurs.",
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
      <body className={`${inter.className} ${display.variable}`}>
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
