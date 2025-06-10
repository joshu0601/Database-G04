import { ArrowDown, ArrowUp } from "lucide-react"

export function RecentTransactions() {
  const transactions = [
    {
      id: "1",
      description: "工資入賬",
      amount: 5000,
      type: "income",
      date: "2023-06-01",
      account: "活期賬戶",
    },
    {
      id: "2",
      description: "房租支付",
      amount: 1200,
      type: "expense",
      date: "2023-06-02",
      account: "活期賬戶",
    },
    {
      id: "3",
      description: "超市購物",
      amount: 150.75,
      type: "expense",
      date: "2023-06-03",
      account: "信用卡",
    },
    {
      id: "4",
      description: "自由職業收入",
      amount: 750,
      type: "income",
      date: "2023-06-05",
      account: "儲蓄賬戶",
    },
    {
      id: "5",
      description: "水電費",
      amount: 210.5,
      type: "expense",
      date: "2023-06-07",
      account: "活期賬戶",
    },
  ]

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <div
            className={`mr-2 flex h-8 w-8 items-center justify-center rounded-full ${
              transaction.type === "income" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {transaction.type === "income" ? (
              <ArrowUp className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-600" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-xs text-muted-foreground">
              {transaction.account} • {new Date(transaction.date).toLocaleDateString("zh-CN")}
            </p>
          </div>
          <div className={`font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
            {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}
