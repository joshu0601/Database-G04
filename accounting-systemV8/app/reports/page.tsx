"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"

export default function ReportsPage() {
  const [period, setPeriod] = useState("month")

  // 圖表資料
  const expensesByCategory = [
    { name: "住房", value: 1200 },
    { name: "食品", value: 450 },
    { name: "交通", value: 200 },
    { name: "公共費用", value: 300 },
    { name: "娛樂", value: 150 },
    { name: "醫療保健", value: 100 },
    { name: "其他", value: 180 },
  ]

  const monthlyData = [
    { name: "一月", income: 4000, expenses: 2400, savings: 1600 },
    { name: "二月", income: 3000, expenses: 1398, savings: 1602 },
    { name: "三月", income: 9800, expenses: 2000, savings: 7800 },
    { name: "四月", income: 3908, expenses: 2780, savings: 1128 },
    { name: "五月", income: 4800, expenses: 1890, savings: 2910 },
    { name: "六月", income: 3800, expenses: 2390, savings: 1410 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FCCDE5"]

  // 格式化月份名稱的函數
  const formatMonth = (name) => {
    if (typeof name === 'string' && name.includes('月月')) {
      return name.replace('月月', '月');
    }
    return name;
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">財務報表</h1>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="選擇週期" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="quarter">本季度</SelectItem>
                <SelectItem value="year">本年度</SelectItem>
                <SelectItem value="all">全部時間</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">匯出</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">總覽</TabsTrigger>
            <TabsTrigger value="income-expense">收入和支出</TabsTrigger>
            <TabsTrigger value="categories">消費類別</TabsTrigger>
            <TabsTrigger value="trends">趨勢分析</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">總收入</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">$7,050.00</div>
                  <p className="text-xs text-muted-foreground">較上月增長 12%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">總支出</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">$2,580.00</div>
                  <p className="text-xs text-muted-foreground">較上月減少 3%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">淨儲蓄</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$4,470.00</div>
                  <p className="text-xs text-muted-foreground">較上月增長 24%</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>收入與支出比較</CardTitle>
                  <CardDescription>月度收入和支出對比</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="name" tickFormatter={formatMonth} />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, ""]} 
                        labelFormatter={formatMonth}
                      />
                      <Legend />
                      <Bar dataKey="income" name="收入" fill="#4ade80" />
                      <Bar dataKey="expenses" name="支出" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>支出明細</CardTitle>
                  <CardDescription>
                    {period === "month"
                      ? "本月"
                      : period === "quarter"
                        ? "本季度"
                        : period === "year"
                          ? "本年度"
                          : "全部時間"}
                    各類別支出比例
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expensesByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expensesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="income-expense" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>收入與支出詳情</CardTitle>
                <CardDescription>您的收入和支出詳細分類</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">請從上方選擇時間週期來查看詳細的收支數據。</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>消費類別分析</CardTitle>
                <CardDescription>各類別消費詳細內容</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">請從上方選擇時間週期來查看詳細的類別數據。</p>
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
                <p className="text-muted-foreground">請從上方選擇時間週期來查看趨勢數據。</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
