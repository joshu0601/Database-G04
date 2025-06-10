import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from "@/components/sidebar" // 引入 Sidebar 元件

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Accounting System",
  description: "A simple accounting system for personal and small business finances",
  generator: "FAFA",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex">
              <Sidebar /> {/* 加入 Sidebar */}
              <div className="flex-1">{children}</div> {/* 主內容區域 */}
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
