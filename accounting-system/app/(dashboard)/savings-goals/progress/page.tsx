"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Target, TrendingUp, DollarSign, Clock, Award, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SavingsGoalsProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedGoal, setSelectedGoal] = useState("all")

  // 模擬數據
  const goals = [
    {
      id: "1",
      name: "緊急基金",
      targetAmount: 50000,
      currentAmount: 32500,
      targetDate: "2024-12-31",
      category: "緊急基金",
      status: "進行中",
      priority: "高",
      monthlyTarget: 4000,
      startDate: "2024-01-01",
    },
    {
      id: "2",
      name: "度假基金",
      targetAmount: 15000,
      currentAmount: 8500,
      targetDate: "2024-08-15",
      category: "旅遊",
      status: "進行中",
      priority: "中",
      monthlyTarget: 2000,
      startDate: "2024-03-01",
    },
    {
      id: "3",
      name: "新車基金",
      targetAmount: 80000,
      currentAmount: 25000,
      targetDate: "2025-06-30",
      category: "交通",
      status: "進行中",
      priority: "中",
      monthlyTarget: 3500,
      startDate: "2024-01-01",
    },
    {
      id: "4",
      name: "投資基金",
      targetAmount: 30000,
      currentAmount: 30000,
      targetDate: "2024-03-31",
      category: "投資",
      status: "已完成",
      priority: "高",
      monthlyTarget: 5000,
      startDate: "2023-10-01",
    },
  ]

  // 進度趨勢數據
  const progressTrendData = [
    { month: "1月", 緊急基金: 5000, 度假基金: 0, 新車基金: 3000, 投資基金: 25000 },
    { month: "2月", 緊急基金: 9500, 度假基金: 0, 新車基金: 6500, 投資基金: 30000 },
    { month: "3月", 緊急基金: 14000, 度假基金: 2000, 新車基金: 10000, 投資基金: 30000 },
    { month: "4月", 緊急基金: 18500, 度假基金: 4500, 新車基金: 13500, 投資基金: 30000 },
    { month: "5月", 緊急基金: 23000, 度假基金: 6500, 新車基金: 17000, 投資基金: 30000 },
    { month: "6月", 緊急基金: 27500, 度假基金: 8500, 新車基金: 21000, 投資基金: 30000 },
    { month: "7月", 緊急基金: 32500, 度假基金: 8500, 新車基金: 25000, 投資基金: 30000 },
  ]

  // 每月儲蓄數據
  const monthlySavingsData = [
    { month: "1月", 計劃: 11000, 實際: 8000, 差異: -3000 },
    { month: "2月", 計劃: 11000, 實際: 11500, 差異: 500 },
    { month: "3月", 計劃: 13000, 實際: 12000, 差異: -1000 },
    { month: "4月", 計劃: 13000, 實際: 13000, 差異: 0 },
    { month: "5月", 計劃: 13000, 實際: 12500, 差異: -500 },
    { month: "6月", 計劃: 13000, 實際: 14000, 差異: 1000 },
    { month: "7月", 計劃: 13000, 實際: 12000, 差異: -1000 },
  ]

  // 目標完成預測數據
  const completionPredictionData = [
    { goal: "緊急基金", 預計完成: "2024-12", 目標日期: "2024-12", 狀態: "準時" },
    { goal: "度假基金", 預計完成: "2024-09", 目標日期: "2024-08", 狀態: "延遲" },
    { goal: "新車基金", 預計完成: "2025-08", 目標日期: "2025-06", 狀態: "延遲" },
    { goal: "投資基金", 預計完成: "2024-03", 目標日期: "2024-03", 狀態: "已完成" },
  ]

  // 目標分布數據
  const goalDistributionData = [
    { name: "緊急基金", value: 32500, color: "#3b82f6" },
    { name: "度假基金", value: 8500, color: "#10b981" },
    { name: "新車基金", value: 25000, color: "#f59e0b" },
    { name: "投資基金", value: 30000, color: "#8b5cf6" },
  ]

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "準時":
        return "text-green-600"
      case "延遲":
        return "text-red-600"
      case "已完成":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const overallProgress = (totalCurrentAmount / totalTargetAmount) * 100
  const completedGoals = goals.filter((goal) => goal.status === "已完成").length
  const activeGoals = goals.filter((goal) => goal.status === "進行中").length

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/savings-goals">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回目標列表
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">儲蓄目標進度分析</h1>
              <p className="text-muted-foreground">詳細追蹤您的儲蓄目標進度和趨勢</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">近3個月</SelectItem>
                <SelectItem value="6months">近6個月</SelectItem>
                <SelectItem value="1year">近1年</SelectItem>
                <SelectItem value="all">全部時間</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 總覽統計 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">整體進度</CardTitle>
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
              <Progress value={overallProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                ${totalCurrentAmount.toLocaleString()} / ${totalTargetAmount.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已完成目標</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedGoals}</div>
              <p className="text-xs text-muted-foreground">
                活躍目標: {activeGoals} | 總目標: {goals.length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">本月儲蓄</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,000</div>
              <p className="text-xs text-muted-foreground">目標: $13,000 (92%)</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均完成率</CardTitle>
              <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  goals
                    .filter((g) => g.status === "進行中")
                    .reduce((sum, goal) => sum + calculateProgress(goal.currentAmount, goal.targetAmount), 0) /
                  activeGoals
                ).toFixed(1)}
                %
              </div>
              <p className="text-xs text-muted-foreground">活躍目標平均進度</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trends">進度趨勢</TabsTrigger>
            <TabsTrigger value="performance">表現分析</TabsTrigger>
            <TabsTrigger value="predictions">完成預測</TabsTrigger>
            <TabsTrigger value="distribution">目標分布</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1">
              <Card>
                <CardHeader>
                  <CardTitle>儲蓄目標進度趨勢</CardTitle>
                  <CardDescription>查看各個目標的累積進度變化</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={progressTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="緊急基金"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="度假基金"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="新車基金"
                        stackId="1"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="投資基金"
                        stackId="1"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              <Card>
                <CardHeader>
                  <CardTitle>個別目標進度詳情</CardTitle>
                  <CardDescription>查看每個目標的詳細進度信息</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {goals
                      .filter((goal) => goal.status === "進行中")
                      .map((goal) => {
                        const progress = calculateProgress(goal.currentAmount, goal.targetAmount)
                        const daysLeft = Math.ceil(
                          (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                        )
                        const monthsLeft = Math.ceil(daysLeft / 30)
                        const requiredMonthly = (goal.targetAmount - goal.currentAmount) / monthsLeft

                        return (
                          <div key={goal.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold">{goal.name}</h3>
                              <Badge variant="outline">{goal.category}</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">當前進度</p>
                                <div className="mt-1">
                                  <Progress value={progress} className="h-2" />
                                  <p className="text-xs mt-1">{progress.toFixed(1)}% 完成</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">金額進度</p>
                                <p className="font-medium">
                                  ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  還需 ${(goal.targetAmount - goal.currentAmount).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">時間進度</p>
                                <p className="font-medium">{daysLeft} 天剩餘</p>
                                <p className="text-xs text-muted-foreground">需每月存 ${requiredMonthly.toFixed(0)}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>每月儲蓄表現</CardTitle>
                <CardDescription>比較計劃儲蓄與實際儲蓄的差異</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlySavingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Bar dataKey="計劃" fill="#94a3b8" name="計劃儲蓄" />
                    <Bar dataKey="實際" fill="#3b82f6" name="實際儲蓄" />
                    <Bar dataKey="差異" fill="#ef4444" name="差異" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>目標完成預測</CardTitle>
                <CardDescription>基於當前進度預測各目標的完成時間</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completionPredictionData.map((prediction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            prediction.狀態 === "準時"
                              ? "bg-green-500"
                              : prediction.狀態 === "延遲"
                                ? "bg-red-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{prediction.goal}</p>
                          <p className="text-sm text-muted-foreground">
                            目標日期: {prediction.目標日期} | 預計完成: {prediction.預計完成}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          prediction.狀態 === "準時"
                            ? "default"
                            : prediction.狀態 === "延遲"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {prediction.狀態}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>目標金額分布</CardTitle>
                  <CardDescription>各目標當前儲蓄金額的分布情況</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={goalDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {goalDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>目標狀態統計</CardTitle>
                  <CardDescription>各類目標的完成情況統計</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">已完成</span>
                      </div>
                      <span className="font-medium">{completedGoals} 個</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">進行中</span>
                      </div>
                      <span className="font-medium">{activeGoals} 個</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">需要關注</span>
                      </div>
                      <span className="font-medium">
                        {
                          goals.filter((goal) => {
                            const daysLeft = Math.ceil(
                              (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                            )
                            return daysLeft <= 60 && goal.status === "進行中"
                          }).length
                        }{" "}
                        個
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">總目標金額</span>
                      </div>
                      <span className="font-medium">${totalTargetAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
