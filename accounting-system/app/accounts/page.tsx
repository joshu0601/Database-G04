import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function AccountsPage() {
  const accounts = [
    {
      id: "1",
      name: "Checking Account",
      type: "Checking",
      balance: 3500.42,
      institution: "Bank of America",
      lastUpdated: "2023-06-28",
    },
    {
      id: "2",
      name: "Savings Account",
      type: "Savings",
      balance: 12750.0,
      institution: "Bank of America",
      lastUpdated: "2023-06-28",
    },
    {
      id: "3",
      name: "Credit Card",
      type: "Credit",
      balance: -1250.75,
      institution: "Chase",
      lastUpdated: "2023-06-27",
    },
    {
      id: "4",
      name: "Investment Account",
      type: "Investment",
      balance: 28500.33,
      institution: "Vanguard",
      lastUpdated: "2023-06-25",
    },
    {
      id: "5",
      name: "Cash",
      type: "Cash",
      balance: 230.0,
      institution: "Personal",
      lastUpdated: "2023-06-28",
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Accounts</h1>
          <Link href="/accounts/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Account
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                $
                {accounts
                  .filter((a) => a.balance > 0)
                  .reduce((sum, account) => sum + account.balance, 0)
                  .toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                $
                {Math.abs(
                  accounts.filter((a) => a.balance < 0).reduce((sum, account) => sum + account.balance, 0),
                ).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${accounts.reduce((sum, account) => sum + account.balance, 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accounts.length}</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Accounts</CardTitle>
            <CardDescription>Manage all your financial accounts in one place.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell>{account.type}</TableCell>
                    <TableCell>{account.institution}</TableCell>
                    <TableCell>{new Date(account.lastUpdated).toLocaleDateString()}</TableCell>
                    <TableCell className={`text-right ${account.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${account.balance.toFixed(2)}
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
