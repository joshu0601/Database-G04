"use client"

import { DollarSign, CreditCard, PieChart, ArrowUpDown, Users, Plus, ChevronRight, LogOut, Target } from "lucide-react"
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
  const { logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // 快速操作功能
  const handleAddIncome = () => {
    router.push("/transactions/new?type=income")
  }

  const handleAddExpense = () => {
    router.push("/transactions/new?type=expense")
  }

  const handleAddAccount = () => {
    router.push("/accounts/new")
  }

  const handleGenerateReport = () => {
    router.push("/reports")
    // 顯示提示訊息
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">總資產</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">較上月 +20.1%</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">收入</CardTitle>
                  <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,234.00</div>
                  <p className="text-xs text-muted-foreground">較上月 +4.3%</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">支出</CardTitle>
                  <ArrowUpDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,344.00</div>
                  <p className="text-xs text-muted-foreground">較上月 +1.2%</p>
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
            <Card>
              <CardHeader>
                <CardTitle>財務分析</CardTitle>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <CardTitle>收入分析</CardTitle>
                          <CardDescription>查看收入來源和趨勢</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">薪資</span>
                              <span className="text-sm font-medium">$8,000</span>
                            </div>
                            <Progress value={60} className="h-2" />
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">投資</span>
                              <span className="text-sm font-medium">$3,000</span>
                            </div>
                            <Progress value={30} className="h-2" />
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">其他</span>
                              <span className="text-sm font-medium">$1,000</span>
                            </div>
                            <Progress value={10} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>支出分析</CardTitle>
                          <CardDescription>查看支出類別和趨勢</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">住房</span>
                              <span className="text-sm font-medium">$3,500</span>
                            </div>
                            <Progress value={50} className="h-2" />
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">食品</span>
                              <span className="text-sm font-medium">$2,100</span>
                            </div>
                            <Progress value={30} className="h-2" />
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">交通</span>
                              <span className="text-sm font-medium">$1,200</span>
                            </div>
                            <Progress value={20} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>現金流趨勢</CardTitle>
                          <CardDescription>查看收入與支出的變化趨勢</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Overview />
                        </CardContent>
                      </Card>
                    </div>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>財務報表</CardTitle>
                <CardContent>
                  <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                    <p className="text-sm font-medium text-muted-foreground">本月收入</p>
                    <p className="text-2xl font-bold text-green-600">$12,234.00</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950">
                    <p className="text-sm font-medium text-muted-foreground">本月支出</p>
                    <p className="text-2xl font-bold text-red-600">$8,344.00</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                    <p className="text-sm font-medium text-muted-foreground">淨收入</p>
                    <p className="text-2xl font-bold text-blue-600">$3,890.00</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
                    <p className="text-sm font-medium text-muted-foreground">儲蓄率</p>
                    <p className="text-2xl font-bold text-purple-600">32%</p>
                    </div>
                  </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "報表下載中",
                        description: "您的財務報表正在準備下載...",
                      })
                    }}
                  >
                    下載報表
                  </Button>
                </CardFooter>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
