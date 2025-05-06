"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "一月",
    收入: 4000,
    支出: 2400,
  },
  {
    name: "二月",
    收入: 3000,
    支出: 1398,
  },
  {
    name: "三月",
    收入: 9800,
    支出: 2000,
  },
  {
    name: "四月",
    收入: 3908,
    支出: 2780,
  },
  {
    name: "五月",
    收入: 4800,
    支出: 1890,
  },
  {
    name: "六月",
    收入: 3800,
    支出: 2390,
  },
  {
    name: "七月",
    收入: 4300,
    支出: 3490,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `¥${value}`}
        />
        <Tooltip formatter={(value) => [`¥${value}`, ""]} labelFormatter={(label) => `${label}月`} />
        <Legend />
        <Bar dataKey="收入" name="收入" fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar dataKey="支出" name="支出" fill="#f87171" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
