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
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // 立即檢查 token 是否存在
  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    if (!token) {
      setIsLoading(false) // 如果沒有 token，立即結束載入狀態
    }
  }, [])

  // 驗證 JWT 並設置用戶狀態
  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem("jwtToken")
        if (!token) {
          return // 已在上面的 useEffect 處理了
        }

        // 創建帶有超時的請求
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000) // 3秒超時
        
        const response = await fetch("/api/verify-token", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem("jwtToken")
        }
      } catch (error) {
        console.error("Error verifying token:", error)
        localStorage.removeItem("jwtToken")
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  // 處理路由重定向 - 只在身份驗證狀態改變後執行
  useEffect(() => {
    if (isLoading) return // 還在載入中，不處理路由

    const isAuthRoute = pathname?.includes("login") || pathname?.includes("register")
    
    if (!isAuthenticated && !isAuthRoute) {
      // 如果用戶未驗證且當前路由不是登入或註冊頁面，則重定向
      router.replace("/login")
    } else if (isAuthenticated && isAuthRoute) {
      router.replace("/")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // 登入函數 - 緩存用戶資料
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      
      if (!response.ok) throw new Error("登入失敗")
      const { token, user } = await response.json()
      
      localStorage.setItem("jwtToken", token)
      localStorage.setItem("userData", JSON.stringify(user)) // 緩存用戶資料
      
      setUser(user)
      setIsAuthenticated(true)
      router.replace("/")
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
      
      router.replace("/login")
      return true
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("userData")
    router.replace("/login")
  }

  // 條件渲染：只有在驗證完成後才顯示內容
  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">正在加載...</div>
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, isAuthenticated }}>
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
