import "./globals.css";
import type { Metadata } from "next";
import RecoilProvider from "@/components/providers/RecoilProvider";
import AuthProvider from "@/components/providers/SessionProvider";
import { InitUser } from "@/components/InitUser";
import ToastProvider from "@/components/providers/ToastProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <RecoilProvider>
          <body>
            <ToastProvider />
            <InitUser />
            {children}
          </body>
        </RecoilProvider>
      </html>
    </AuthProvider>
  );
}
