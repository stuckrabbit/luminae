import FooterTemplate from "@/app/shared/FooterTemplate";
import HeaderTemplate from "@/app/shared/HeaderTemplate";
import { ClerkProvider } from "@clerk/nextjs";
import "../src/app/globals.css";
import "../src/app/fonts.css";

export const metadata = {
  title: 'Luminae',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>   
      <body>
      <HeaderTemplate/>
      {children}
      <FooterTemplate/>
      </body>     
      </ClerkProvider>
    </html>
  )
}