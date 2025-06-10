"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function NewSavingsGoalPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [targetDate, setTargetDate] = useState<Date | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 在實際應用中，您會在此處保存目標到後端
      await new Promise((resolve) => setTimeout(resolve, 1000)) // 模擬API調用

      toast({
        title: "目標創建成功",
        description: "您的儲蓄目標已成功創建！",
      })

      router.push("/savings-goals")
    } catch (error) {
      toast({
        title: "創建失敗",
        description: "創建儲蓄目標時發生錯誤，請重試。",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="mx-auto w-full max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>新增儲蓄目標</CardTitle>
              <CardDescription>設定一個新的儲蓄目標來追蹤您的財務進度</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">目標名稱</Label>
                    <Input id="name" placeholder="例如：緊急基金" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">類別</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="選擇類別" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">緊急基金</SelectItem>
                        <SelectItem value="travel">旅遊</SelectItem>
                        <SelectItem value="housing">住房</SelectItem>
                        <SelectItem value="transportation">交通</SelectItem>
                        <SelectItem value="education">教育</SelectItem>
                        <SelectItem value="investment">投資</SelectItem>
                        <SelectItem value="healthcare">醫療</SelectItem>
                        <SelectItem value="entertainment">娛樂</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">描述</Label>
                  <Textarea id="description" placeholder="描述您的儲蓄目標..." className="min-h-[80px]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">目標金額</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                      <Input id="targetAmount" type="number" step="0.01" placeholder="0.00" className="pl-8" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentAmount">目前金額</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                      <Input
                        id="currentAmount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-8"
                        defaultValue="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetDate">目標日期</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !targetDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {targetDate ? format(targetDate, "PPP") : <span>選擇目標日期</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={targetDate}
                          onSelect={setTargetDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">優先級</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="選擇優先級" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">高</SelectItem>
                        <SelectItem value="medium">中</SelectItem>
                        <SelectItem value="low">低</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyContribution">每月計劃存款</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                    <Input id="monthlyContribution" type="number" step="0.01" placeholder="0.00" className="pl-8" />
                  </div>
                  <p className="text-xs text-muted-foreground">設定每月計劃存款金額，系統將幫助您追蹤進度</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  取消
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "創建中..." : "創建目標"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
