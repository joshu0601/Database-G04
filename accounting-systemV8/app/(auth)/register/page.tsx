"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CreditCard, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const firstName = formData.get("first-name") as string
      const lastName = formData.get("last-name") as string
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      const confirmPassword = formData.get("confirm-password") as string

      if (password !== confirmPassword) {
        throw new Error("兩次輸入的密碼不一致")
      }

      const name = `${firstName} ${lastName}`
      await register(name, email, password)

      toast({
        title: "賬戶創建成功",
        description: "您的賬戶已成功創建！",
      })
      router.push("/login")
    } catch (error: any) {
      toast({
        title: "註冊失敗",
        description: error.message || "註冊過程中發生錯誤",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <CreditCard className="h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold">財務管理系統</h1>
          <p className="text-muted-foreground">創建新賬戶</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">名</Label>
                <Input id="first-name" name="first-name" placeholder="名" required autoComplete="given-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">姓</Label>
                <Input id="last-name" name="last-name" placeholder="姓" required autoComplete="family-name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">電子郵件</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密碼</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "隱藏密碼" : "顯示密碼"}</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">密碼必須至少包含 8 個字符</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">確認密碼</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "創建賬戶中..." : "創建賬戶"}
          </Button>

          <div className="text-center text-sm">
            已有賬戶？{" "}
            <Link href="/login" className="text-primary hover:underline">
              登錄
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
