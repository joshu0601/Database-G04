"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportsPage() {
  const [period, setPeriod] = useState("month")

  // Sample data for charts
  const expensesByCategory = [
    { name: "住房", value: 1200, percentage: 40 },
    { name: "食品", value: 450, percentage: 15 },
    { name: "交通", value: 200, percentage: 7 },
    { name: "水電費", value: 300, percentage: 10 },
    { name: "娛樂", value: 150, percentage: 5 },
    { name: "醫療保健", value: 100, percentage: 3 },
    { name: "其他", value: 180, percentage: 6 },
  ]

  const monthlyData = [
    { name: "一月", income: 4000, expenses: 2400, savings: 1600 },
    { name: "二月", income: 3000, expenses: 1398, savings: 1602 },
    { name: "三月", income: 9800, expenses: 2000, savings: 7800 },
    { name: "四月", income: 3908, expenses: 2780, savings: 1128 },
    { name: "五月", income: 4800, expenses: 1890, savings: 2910 },
    { name: "六月", income: 3800, expenses: 2390, savings: 1410 },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316"]

  const maxIncome = Math.max(...monthlyData.map((d) => d.income))

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">財務報表</h1>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="選擇期間" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="quarter">本季</SelectItem>
                <SelectItem value="year">本年</SelectItem>
                <SelectItem value="all">全部時間</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">匯出</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">概覽</TabsTrigger>
            <TabsTrigger value="income-expense">收入與支出</TabsTrigger>
            <TabsTrigger value="categories">分類</TabsTrigger>
            <TabsTrigger value="trends">趨勢</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">總收入</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">$7,050.00</div>
                  <p className="text-xs text-muted-foreground">較上月 +12%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">總支出</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">$2,580.00</div>
                  <p className="text-xs text-muted-foreground">較上月 -3%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">淨儲蓄</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$4,470.00</div>
                  <p className="text-xs text-muted-foreground">較上月 +24%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">儲蓄率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">63.4%</div>
                  <p className="text-xs text-muted-foreground">較上月 +8%</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>收入 vs. 支出</CardTitle>
                  <CardDescription>每月收入和支出比較</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{data.name}</span>
                          <span>
                            收入: ${data.income.toLocaleString()} | 支出: ${data.expenses.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex gap-1 h-6">
                          <div
                            className="bg-green-500 rounded-l flex items-center justify-center text-xs text-white"
                            style={{ width: `${(data.income / maxIncome) * 70}%` }}
                          >
                            {data.income > 3000 ? "收入" : ""}
                          </div>
                          <div
                            className="bg-red-500 rounded-r flex items-center justify-center text-xs text-white"
                            style={{ width: `${(data.expenses / maxIncome) * 70}%` }}
                          >
                            {data.expenses > 2000 ? "支出" : ""}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>支出分類</CardTitle>
                  <CardDescription>
                    {period === "month"
                      ? "本月"
                      : period === "quarter"
                        ? "本季"
                        : period === "year"
                          ? "本年"
                          : "全部時間"}
                    的支出分類
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expensesByCategory.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{category.name}</span>
                          <span>
                            ${category.value.toLocaleString()} ({category.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${category.percentage * 2.5}%`,
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="income-expense" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>收入與支出詳情</CardTitle>
                <CardDescription>詳細的收入和支出分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-3">收入來源</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>薪資收入</span>
                        <span className="font-medium text-green-600">$5,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>自由職業</span>
                        <span className="font-medium text-green-600">$1,500</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>投資收益</span>
                        <span className="font-medium text-green-600">$550</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">主要支出</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>房租</span>
                        <span className="font-medium text-red-600">$1,200</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>食品雜貨</span>
                        <span className="font-medium text-red-600">$450</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>水電費</span>
                        <span className="font-medium text-red-600">$300</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>分類支出分析</CardTitle>
                <CardDescription>按類別詳細分析您的支出</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {expensesByCategory.map((category, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{category.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold">${category.value.toLocaleString()}</div>
                        <div className="flex items-center mt-2">
                          <div className="flex-1 bg-muted rounded-full h-2 mr-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${category.percentage * 2.5}%`,
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>財務趨勢</CardTitle>
                <CardDescription>長期財務數據趨勢分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">月度儲蓄趨勢</h3>
                    <div className="space-y-3">
                      {monthlyData.map((data, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <span className="w-12 text-sm">{data.name}</span>
                          <div className="flex-1 flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-4 relative">
                              <div
                                className="h-4 bg-blue-500 rounded-full flex items-center justify-end pr-2"
                                style={{ width: `${(data.savings / 8000) * 100}%` }}
                              >
                                <span className="text-xs text-white font-medium">
                                  {data.savings > 2000 ? `$${data.savings.toLocaleString()}` : ""}
                                </span>
                              </div>
                            </div>
                            <span className="text-sm w-20">${data.savings.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">支出趨勢分析</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">↓ 8%</div>
                            <p className="text-sm text-muted-foreground">支出減少</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">↑ 15%</div>
                            <p className="text-sm text-muted-foreground">收入增加</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">↑ 24%</div>
                            <p className="text-sm text-muted-foreground">儲蓄增加</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
