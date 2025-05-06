"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { useRouter, useSearchParams } from "next/navigation"

export default function NewTransactionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [transactionType, setTransactionType] = useState<string>("expense")

  // 從 URL 參數中獲取交易類型
  useEffect(() => {
    const type = searchParams.get("type")
    if (type && (type === "income" || type === "expense" || type === "transfer")) {
      setTransactionType(type)
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 在實際應用中，您會在此處保存交易
    router.push("/transactions")
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="mx-auto w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>新增交易</CardTitle>
              <CardDescription>將新交易添加到您的賬戶</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">交易類型</Label>
                  <Select defaultValue={transactionType} onValueChange={setTransactionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="選擇類型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">收入</SelectItem>
                      <SelectItem value="expense">支出</SelectItem>
                      <SelectItem value="transfer">轉賬</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">金額</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">¥</span>
                    <Input id="amount" type="number" step="0.01" placeholder="0.00" className="pl-8" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">日期</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>選擇日期</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">描述</Label>
                  <Input id="description" placeholder="交易描述" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">類別</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="選擇類別" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">收入</SelectItem>
                      <SelectItem value="housing">住房</SelectItem>
                      <SelectItem value="food">食品</SelectItem>
                      <SelectItem value="transportation">交通</SelectItem>
                      <SelectItem value="utilities">水電費</SelectItem>
                      <SelectItem value="entertainment">娛樂</SelectItem>
                      <SelectItem value="healthcare">醫療保健</SelectItem>
                      <SelectItem value="personal">個人</SelectItem>
                      <SelectItem value="education">教育</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account">賬戶</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="選擇賬戶" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">活期賬戶</SelectItem>
                      <SelectItem value="savings">儲蓄賬戶</SelectItem>
                      <SelectItem value="credit">信用卡</SelectItem>
                      <SelectItem value="investment">投資賬戶</SelectItem>
                      <SelectItem value="cash">現金</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">備註（可選）</Label>
                  <Textarea id="notes" placeholder="關於此交易的其他備註" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  取消
                </Button>
                <Button type="submit">保存交易</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
