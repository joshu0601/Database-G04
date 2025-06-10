"use client"

import { DollarSign, CreditCard, ArrowUpDown, Users, Plus, ChevronRight, LogOut, PieChart, Target } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const { logout, totalAssets, totalIncome, totalExpense } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // 快速操作功能
  const handleAddIncome = () => router.push("/transactions/new?type=income")
  const handleAddExpense = () => router.push("/transactions/new?type=expense")
  const handleGenerateReport = () => {
    router.push("/reports")
    toast({
      title: "報表生成中",
      description: "您的財務報表正在生成，請稍候...",
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">財務儀表板</h1>
            <p className="text-muted-foreground">查看您的財務概況和最近交易</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              登出
            </Button>
            <Link href="/transactions/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新增交易
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">概覽</TabsTrigger>
            <TabsTrigger value="analytics">分析</TabsTrigger>
            <TabsTrigger value="reports">報表</TabsTrigger>
          </TabsList>

          {/* 概覽 */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">總資產</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
  // 報表頁面的數據
  const reportsData = {
    monthlyComparison: [
      { month: "一月", income: 4000, expenses: 2400, savings: 1600 },
      { month: "二月", income: 3000, expenses: 1398, savings: 1602 },
      { month: "三月", income: 9800, expenses: 2000, savings: 7800 },
      { month: "四月", income: 3908, expenses: 2780, savings: 1128 },
      { month: "五月", income: 4800, expenses: 1890, savings: 2910 },
      { month: "六月", income: 3800, expenses: 2390, savings: 1410 },
    ],
    savingsRate: [
      { month: "一月", rate: 40 },
      { month: "二月", rate: 53 },
      { month: "三月", rate: 80 },
      { month: "四月", rate: 29 },
      { month: "五月", rate: 61 },
      { month: "六月", rate: 37 },
    ],
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">財務儀表板</h1>
            <p className="text-muted-foreground">查看您的財務概況和最近交易</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => logout()} className="gap-2">
              <LogOut className="h-4 w-4" />
              登出
            </Button>
            <Link href="/transactions/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新增交易
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">概覽</TabsTrigger>
            <TabsTrigger value="analytics">分析</TabsTrigger>
            <TabsTrigger value="reports">報表</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">總資產</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalAssets !== null ? `$${Number(totalAssets).toLocaleString()}` : "載入中..."}
                  </div>
                  {/*<p className="text-xs text-muted-foreground">較上月 +20.1%</p>*/}
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">收入</CardTitle>
                  <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                  {totalIncome !== null ? `$${Number(totalIncome).toLocaleString()}` : "載入中..."}
                  <p className="text-xs text-muted-foreground">較上月 +4.3%</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">支出</CardTitle>
                  <ArrowUpDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                </CardHeader>
                <CardContent>
                  {totalExpense !== null ? `$${Number(totalExpense).toLocaleString()}` : "載入中..."}
                  <p className="text-xs text-muted-foreground">較上月 +1.2%</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">帳戶數量</CardTitle>
                  <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">新增 2 個帳戶</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>財務概覽</CardTitle>
                    <CardDescription>查看您的收入和支出趨勢</CardDescription>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" onClick={() => router.push("/reports")}>
                      查看詳情
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>最近交易</CardTitle>
                  <CardDescription>本月您進行了 12 筆交易</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTransactions />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "數據匯出中",
                        description: "您的交易數據正在準備匯出...",
                      })
                    }}
                  >
                    匯出數據
                  </Button>
                  <Link href="/transactions">
                    <Button variant="outline" size="sm">
                      查看全部
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>快速操作</CardTitle>
                  <CardDescription>常用功能快速訪問</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Button variant="outline" className="justify-start" onClick={handleAddIncome}>
                    <Plus className="mr-2 h-4 w-4 text-green-500" />
                    新增收入
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={handleAddExpense}>
                    <Plus className="mr-2 h-4 w-4 text-red-500" />
                    新增支出
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={handleGenerateReport}>
                    <PieChart className="mr-2 h-4 w-4 text-purple-500" />
                    生成報表
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => router.push("/savings-goals/new")}>
                    <Target className="mr-2 h-4 w-4 text-indigo-500" />
                    新增儲蓄目標
                  </Button>
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>支出分類</CardTitle>
                  <CardDescription>按類別查看您的支出</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-full flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">住房</span>
                          <span className="text-sm font-medium">$3,500</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[42%] rounded-full bg-blue-500" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">食品</span>
                          <span className="text-sm font-medium">$2,100</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[25%] rounded-full bg-green-500" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">交通</span>
                          <span className="text-sm font-medium">$1,200</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[14%] rounded-full bg-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">娛樂</span>
                          <span className="text-sm font-medium">$800</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[10%] rounded-full bg-purple-500" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">其他</span>
                          <span className="text-sm font-medium">$744</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[9%] rounded-full bg-red-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 儲蓄目標進度部分 */}
            <div className="grid gap-4 md:grid-cols-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>儲蓄目標進度</CardTitle>
                    <CardDescription>查看您的儲蓄目標完成情况</CardDescription>
                  </div>
                  <Link href="/savings-goals">
                    <Button variant="outline" size="sm">
                      查看全部
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* 整體進度 */}
                    <div className="rounded-lg border p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">整體儲蓄進度</span>
                        <span className="text-sm font-bold">67.2%</span>
                      </div>
                      <Progress value={67.2} className="h-2 mb-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>已儲蓄: $96,000</span>
                        <span>目標: $295,000</span>
                      </div>
                    </div>

                    {/* 个别目標進度 */}
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">緊急基金</span>
                          </div>
                          <Progress value={65} className="h-1.5 mb-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>$32,500 / $50,000</span>
                            <span>65%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">度假基金</span>
                          </div>
                          <Progress value={56.7} className="h-1.5 mb-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>$8,500 / $15,000</span>
                            <span>56.7%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">新車基金</span>
                          </div>
                          <Progress value={31.3} className="h-1.5 mb-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>$25,000 / $80,000</span>
                            <span>31.3%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50 dark:bg-green-950">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">投資基金</span>
                            <Badge className="text-xs bg-green-500">已完成</Badge>
                          </div>
                          <Progress value={100} className="h-1.5 mb-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>$30,000 / $30,000</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 本月儲蓄统计 */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">本月儲蓄</p>
                        <p className="font-semibold text-sm">$3,500</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">目標達成</p>
                        <p className="font-semibold text-sm text-green-600">85%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">活躍目標</p>
                        <p className="font-semibold text-sm">3個</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>收入來源分析</CardTitle>
                  <CardDescription>按來源查看您的收入分佈</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.incomeBySource.map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{source.source}</span>
                          <span>
                            ${source.amount.toLocaleString()} ({source.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: `${source.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>每日支出趨勢</CardTitle>
                  <CardDescription>查看一週內每天的支出情況</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[200px] items-end gap-2">
                    {analyticsData.expensesByDay.map((day, index) => {
                      const height = (day.amount / 450) * 100
                      return (
                        <div key={index} className="flex flex-1 flex-col items-center gap-2">
                          <div className="w-full rounded-md bg-red-500" style={{ height: `${height}%` }}></div>
                          <span className="text-xs">{day.day}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>支出時間分析</CardTitle>
                  <CardDescription>按時間段查看您的支出模式</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">早上 (6AM-12PM)</span>
                      <span className="text-sm font-medium">$450</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "15%" }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">下午 (12PM-6PM)</span>
                      <span className="text-sm font-medium">$1,200</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "40%" }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">晚上 (6PM-12AM)</span>
                      <span className="text-sm font-medium">$930</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "31%" }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">深夜 (12AM-6AM)</span>
                      <span className="text-sm font-medium">$420</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "14%" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              <Card>
                <CardHeader>
                  <CardTitle>熱門商家</CardTitle>
                  <CardDescription>您最常消費的商家</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topMerchants.map((merchant, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{merchant.name}</p>
                          <p className="text-xs text-muted-foreground">{merchant.transactions} 筆交易</p>
                        </div>
                        <p className="font-medium text-red-600">${merchant.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>支出預測</CardTitle>
                  <CardDescription>基於您的消費習慣的下月支出預測</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">住房</span>
                      <span className="text-sm font-medium">$3,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">食品</span>
                      <span className="text-sm font-medium">$2,200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">交通</span>
                      <span className="text-sm font-medium">$1,100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">娛樂</span>
                      <span className="text-sm font-medium">$850</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">其他</span>
                      <span className="text-sm font-medium">$700</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">預計總支出</span>
                        <span className="font-medium text-red-600">$8,350</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>節省機會</CardTitle>
                  <CardDescription>可能的節省支出機會</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">訂閱服務</p>
                      <p className="text-sm text-muted-foreground">您有 3 個未使用的訂閱服務，每月花費 $120</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        查看詳情
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">餐廳支出</p>
                      <p className="text-sm text-muted-foreground">您的餐廳支出比上月增加了 15%</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        查看詳情
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">水電費</p>
                      <p className="text-sm text-muted-foreground">您的水電費高於同類家庭平均水平</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        查看詳情
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">財務報表</h2>
                <p className="text-sm text-muted-foreground">查看和生成詳細的財務報表</p>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="month">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="選擇時間範圍" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">本週</SelectItem>
                    <SelectItem value="month">本月</SelectItem>
                    <SelectItem value="quarter">本季</SelectItem>
                    <SelectItem value="year">本年</SelectItem>
                    <SelectItem value="custom">自定義</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">匯出報表</Button>
              </div>
            </div>

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
                  <CardTitle>月度收支比較</CardTitle>
                  <CardDescription>查看每月收入和支出的比較</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportsData.monthlyComparison.map((month, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{month.month}</span>
                          <span>
                            收入: ${month.income.toLocaleString()} | 支出: ${month.expenses.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex gap-1 h-6">
                          <div
                            className="bg-green-500 rounded-l flex items-center justify-center text-xs text-white"
                            style={{ width: `${(month.income / 10000) * 100}%` }}
                          >
                            {month.income > 3000 ? "收入" : ""}
                          </div>
                          <div
                            className="bg-red-500 rounded-r flex items-center justify-center text-xs text-white"
                            style={{ width: `${(month.expenses / 10000) * 100}%` }}
                          >
                            {month.expenses > 2000 ? "支出" : ""}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>儲蓄率趨勢</CardTitle>
                  <CardDescription>查看每月儲蓄率的變化</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportsData.savingsRate.map((month, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{month.month}</span>
                          <span>{month.rate}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: `${month.rate}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              <Card>
                <CardHeader>
                  <CardTitle>可用報表</CardTitle>
                  <CardDescription>選擇要生成的報表類型</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">收入報表</h3>
                      <p className="text-sm text-muted-foreground mb-4">詳細分析您的所有收入來源</p>
                      <Button variant="outline" size="sm">
                        生成報表
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">支出報表</h3>
                      <p className="text-sm text-muted-foreground mb-4">按類別查看您的所有支出</p>
                      <Button variant="outline" size="sm">
                        生成報表
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">預算報表</h3>
                      <p className="text-sm text-muted-foreground mb-4">比較預算和實際支出</p>
                      <Button variant="outline" size="sm">
                        生成報表
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">淨資產報表</h3>
                      <p className="text-sm text-muted-foreground mb-4">查看您的資產和負債</p>
                      <Button variant="outline" size="sm">
                        生成報表
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">儲蓄目標報表</h3>
                      <p className="text-sm text-muted-foreground mb-4">追蹤您的儲蓄目標進度</p>
                      <Button variant="outline" size="sm">
                        生成報表
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">稅務報表</h3>
                      <p className="text-sm text-muted-foreground mb-4">準備稅務申報所需的財務數據</p>
                      <Button variant="outline" size="sm">
                        生成報表
                      </Button>
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
