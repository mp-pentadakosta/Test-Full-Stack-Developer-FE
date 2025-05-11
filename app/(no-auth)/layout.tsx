import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";

import { siteConfig } from "@/config/site";
import { SidebarNavbar } from "@/components/navbar";
import { HeaderBar } from "@/components/header.bar";
import { GlobalUserProvider } from "@/global/global.function.user";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalUserProvider>
      <div className="h-full w-full flex flex-row">
        <SidebarNavbar fromHeader={false} />
        <div className="flex flex-col h-screen w-full">
          <HeaderBar />
          <div className="flex-grow overflow-y-auto bg-background py-2.5">
            {children}
          </div>
          <footer className="w-full flex items-center justify-center bg-footer py-0.5">
            <Link
              isExternal
              className="flex items-center gap-1 text-current"
              href="https://heroui.com?utm_source=next-app-template"
              title="heroui.com homepage"
            >
              <span className="text-default-600">Powered by</span>
              <p className="text-primary-500">Tengkuang Onet</p>
            </Link>
          </footer>
        </div>
      </div>
    </GlobalUserProvider>
  );
}
