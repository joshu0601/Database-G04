import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, Plus } from "lucide-react"
import Link from "next/link"

export default function TransactionsPage() {
  const transactions = [
    {
      id: "1",
      description: "Salary Deposit",
      amount: 5000,
      type: "income",
      date: "2023-06-01",
      account: "Checking Account",
      category: "Income",
    },
    {
      id: "2",
      description: "Rent Payment",
      amount: 1200,
      type: "expense",
      date: "2023-06-02",
      account: "Checking Account",
      category: "Housing",
    },
    {
      id: "3",
      description: "Grocery Shopping",
      amount: 150.75,
      type: "expense",
      date: "2023-06-03",
      account: "Credit Card",
      category: "Food",
    },
    {
      id: "4",
      description: "Freelance Work",
      amount: 750,
      type: "income",
      date: "2023-06-05",
      account: "Savings Account",
      category: "Income",
    },
    {
      id: "5",
      description: "Utility Bills",
      amount: 210.5,
      type: "expense",
      date: "2023-06-07",
      account: "Checking Account",
      category: "Utilities",
    },
    {
      id: "6",
      description: "Restaurant Dinner",
      amount: 85.2,
      type: "expense",
      date: "2023-06-10",
      account: "Credit Card",
      category: "Food",
    },
    {
      id: "7",
      description: "Investment Dividend",
      amount: 320,
      type: "income",
      date: "2023-06-15",
      account: "Investment Account",
      category: "Income",
    },
    {
      id: "8",
      description: "Gas Station",
      amount: 45.8,
      type: "expense",
      date: "2023-06-18",
      account: "Credit Card",
      category: "Transportation",
    },
    {
      id: "9",
      description: "Mobile Phone Bill",
      amount: 75,
      type: "expense",
      date: "2023-06-20",
      account: "Checking Account",
      category: "Utilities",
    },
    {
      id: "10",
      description: "Bonus Payment",
      amount: 1000,
      type: "income",
      date: "2023-06-25",
      account: "Checking Account",
      category: "Income",
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">交易紀錄</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Link href="/transactions/new">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Transaction
              </Button>
            </Link>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>所有交易紀錄</CardTitle>
            <CardDescription>A list of all your transactions across all accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.account}</TableCell>
                    <TableCell
                      className={`text-right ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
