"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, Calendar, DollarSign, TrendingUp, Edit, Trash2, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function SavingsGoalsPage() {
  const [goals] = useState([
    {
      id: "1",
      name: "緊急基金",
      description: "建立6個月的生活費緊急基金",
      targetAmount: 50000,
      currentAmount: 32500,
      targetDate: "2024-12-31",
      category: "緊急基金",
      status: "進行中",
      priority: "高",
    },
    {
      id: "2",
      name: "度假基金",
      description: "日本旅遊基金",
      targetAmount: 15000,
      currentAmount: 8500,
      targetDate: "2024-08-15",
      category: "旅遊",
      status: "進行中",
      priority: "中",
    },
    {
      id: "3",
      name: "新車基金",
      description: "購買新車的頭期款",
      targetAmount: 80000,
      currentAmount: 25000,
      targetDate: "2025-06-30",
      category: "交通",
      status: "進行中",
      priority: "中",
    },
    {
      id: "4",
      name: "投資基金",
      description: "股票投資初始資金",
      targetAmount: 30000,
      currentAmount: 30000,
      targetDate: "2024-03-31",
      category: "投資",
      status: "已完成",
      priority: "高",
    },
    {
      id: "5",
      name: "房屋裝修",
      description: "客廳和廚房裝修費用",
      targetAmount: 120000,
      currentAmount: 45000,
      targetDate: "2024-10-31",
      category: "住房",
      status: "進行中",
      priority: "高",
    },
  ])

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已完成":
        return "bg-green-500"
      case "進行中":
        return "bg-blue-500"
      case "暫停":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "destructive"
      case "中":
        return "default"
      case "低":
        return "secondary"
      default:
        return "default"
    }
  }

  const totalGoals = goals.length
  const completedGoals = goals.filter((goal) => goal.status === "已完成").length
  const activeGoals = goals.filter((goal) => goal.status === "進行中").length
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const overallProgress = (totalCurrentAmount / totalTargetAmount) * 100

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">儲蓄目標</h1>
            <p className="text-muted-foreground">管理您的儲蓄目標和追蹤進度</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/savings-goals/progress">
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                進度分析
              </Button>
            </Link>
            <Link href="/savings-goals/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新增目標
              </Button>
            </Link>
          </div>
        </div>

        {/* 統計卡片 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總目標數</CardTitle>
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalGoals}</div>
              <p className="text-xs text-muted-foreground">活躍目標: {activeGoals}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已完成</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedGoals}</div>
              <p className="text-xs text-muted-foreground">
                完成率: {((completedGoals / totalGoals) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">目標總額</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalTargetAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">已儲蓄: ${totalCurrentAmount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">整體進度</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* 目標列表 */}
        <Card>
          <CardHeader>
            <CardTitle>我的儲蓄目標</CardTitle>
            <CardDescription>查看和管理您的所有儲蓄目標</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map((goal) => {
                const progress = calculateProgress(goal.currentAmount, goal.targetAmount)
                const isCompleted = goal.status === "已完成"
                const daysLeft = Math.ceil(
                  (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <div key={goal.id} className="rounded-lg border p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{goal.name}</h3>
                          <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>類別: {goal.category}</span>
                          <span>目標日期: {new Date(goal.targetDate).toLocaleDateString("zh-CN")}</span>
                          {!isCompleted && daysLeft > 0 && <span>剩餘: {daysLeft} 天</span>}
                          {!isCompleted && daysLeft <= 0 && <span className="text-red-500">已逾期</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>進度</span>
                        <span>
                          ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{progress.toFixed(1)}% 完成</span>
                        <span>還需 ${(goal.targetAmount - goal.currentAmount).toLocaleString()}</span>
                      </div>
                    </div>

                    {!isCompleted && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          添加存款
                        </Button>
                        <Button variant="outline" size="sm">
                          調整目標
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* 快速統計 */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>本月儲蓄表現</CardTitle>
              <CardDescription>查看本月的儲蓄進度</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">本月新增儲蓄</span>
                  <span className="font-medium">$3,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">平均每日儲蓄</span>
                  <span className="font-medium">$116</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">目標達成率</span>
                  <span className="font-medium text-green-600">85%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>即將到期的目標</CardTitle>
              <CardDescription>需要關注的緊急目標</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {goals
                  .filter((goal) => {
                    const daysLeft = Math.ceil(
                      (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                    )
                    return daysLeft <= 90 && goal.status === "進行中"
                  })
                  .slice(0, 3)
                  .map((goal) => {
                    const daysLeft = Math.ceil(
                      (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                    )
                    return (
                      <div key={goal.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{goal.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {daysLeft > 0 ? `${daysLeft} 天後到期` : "已逾期"}
                          </p>
                        </div>
                        <Badge variant={daysLeft <= 30 ? "destructive" : "default"}>
                          {calculateProgress(goal.currentAmount, goal.targetAmount).toFixed(0)}%
                        </Badge>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
