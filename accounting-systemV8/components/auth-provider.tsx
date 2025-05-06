"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // 檢查 JWT 是否存在並有效
  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem("jwtToken")
        if (token) {
          // 假設有一個 API 驗證 JWT 的有效性
          const response = await fetch("/api/verify-token", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          })
          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
          } else {
            localStorage.removeItem("jwtToken")
          }
        }
      } catch (error) {
        console.error("Error verifying token:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  // 處理受保護路由
  useEffect(() => {
    if (!isLoading) {
      const isAuthRoute = pathname?.includes("login") || pathname?.includes("register")
      if (!user && !isAuthRoute) {
        router.push("/login")
      } else if (user && isAuthRoute) {
        router.push("/")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      console.log("Login response:", response)
      if (!response.ok) throw new Error("登入失敗")
      const { token, user } = await response.json()
      localStorage.setItem("jwtToken", token)
      setUser(user)
      router.push("/")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      if (!response.ok) throw new Error("註冊失敗")
      
      // 移除 setUser(user) 這一行，不設置用戶狀態
      // 僅導向到登入頁面
      router.push("/login")
      return true // 返回成功標誌
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem("jwtToken")
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login ,register,logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
