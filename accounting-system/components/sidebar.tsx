"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  ArrowUpDown,
  CreditCard,
  PieChart,
  Target,
  Settings,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react"
import { useAuth } from "./auth-provider"

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const routes = [
    {
      href: "/",
      icon: LayoutDashboard,
      title: "儀表板",
    },
    {
      href: "/transactions",
      icon: ArrowUpDown,
      title: "交易記錄",
    },
    {
      href: "/accounts",
      icon: CreditCard,
      title: "賬戶管理",
    },
    {
      href: "/reports",
      icon: PieChart,
      title: "財務報表",
    },
    {
      href: "/savings-goals",
      icon: Target,
      title: "儲蓄目標",
    },
  ]

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <CreditCard className="h-6 w-6" />
          <span>財務管理系統</span>
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-2 border-b p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                (pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))) &&
                  "bg-muted font-medium text-primary",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            登出
          </Button>
        </div>
      </div>
    </div>
  )
}
