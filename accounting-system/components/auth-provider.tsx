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
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  totalAssets: number | null
  totalIncome: number | null
  totalExpense: number | null
  fetchTotalAssets: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [totalAssets, setTotalAssets] = useState<number | null>(null)
  const [totalIncome, setTotalIncome] = useState<number | null>(null)
  const [totalExpense, setTotalExpense] = useState<number | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        const storedToken = localStorage.getItem("token")
        if (!storedToken) {
          setUser(null)
          localStorage.removeItem("user")
          return
        }
        // 驗證 token 是否有效
        const res = await fetch("http://localhost:5000/auth/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${JSON.parse(storedToken)}`
          },
          body: JSON.stringify({ authorization: JSON.parse(storedToken) })
        })
        const data = await res.json()
        if (!res.ok || !data.ok) {
          setUser(null)
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          return
        }
        // token 有效，恢復 user 狀態
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  // Handle protected routes
  useEffect(() => {
    if (!isLoading) {
      const isAuthRoute = pathname?.includes("login") || pathname?.includes("register")

      if (!user && !isAuthRoute && pathname !== "/register") {
        router.push("/login")
      } else if (user && isAuthRoute) {
        router.push("/")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "登入失敗")

      // 假設後端回傳 user 物件
      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", JSON.stringify(data.token))
      setTimeout(() => {
        router.push("/")
        setIsLoading(false)
      }, 100)
    } catch (error) {
      setIsLoading(false)
      console.error("Login failed:", error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "註冊失敗")

      setIsLoading(false)
      router.push("/login")
    } catch (error) {
      setIsLoading(false)
      console.error("Registration failed:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  // 查詢總資產、收入、支出
  const fetchTotalAssets = async () => {
    const token = localStorage.getItem("token")
    if (!user || !token) return
    try {
      const res = await fetch("http://localhost:5000/dashboard/dashbo", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${JSON.parse(token)}`
        }
      })
      const data = await res.json()
      if (res.ok && data.data) {
        setTotalAssets(data.data.total_assets)
        setTotalIncome(data.data.total_income)
        setTotalExpense(data.data.total_expense)
        console.log(data.data.total_assets, data.data.total_income, data.data.total_expense)
      } else {
        setTotalAssets(null)
        setTotalIncome(null)
        setTotalExpense(null)
      }
    } catch (error) {
      setTotalAssets(null)
      setTotalIncome(null)
      setTotalExpense(null)
      console.error("Fetch total assets failed:", error)
    }
  }

  // 登入後自動查詢總資產
  useEffect(() => {
    if (user) {
      fetchTotalAssets()
    } else {
      setTotalAssets(null)
    }
  }, [user])

  return (
    <AuthContext.Provider value={{
      user, login, register, logout, isLoading,
      totalAssets, totalIncome, totalExpense, fetchTotalAssets
    }}>
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
