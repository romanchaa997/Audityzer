
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { TrendingUp } from 'lucide-react'

interface UserActivityData {
  date: string
  count: number
}

interface UserActivityChartProps {
  data: UserActivityData[]
}

export default function UserActivityChart({ data }: UserActivityChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm">{formatDate(label)}</p>
          <p className="text-blue-400 font-medium">
            {payload[0].value} activities
          </p>
        </div>
      )
    }
    return null
  }

  const totalActivity = data.reduce((sum, item) => sum + item.count, 0)
  const avgActivity = Math.round(totalActivity / data.length)

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            User Activity Trend
          </CardTitle>
          <div className="text-right">
            <div className="text-sm text-gray-400">7-day average</div>
            <div className="text-lg font-semibold text-white">{avgActivity}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#374151" 
                horizontal={true}
                vertical={false}
              />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                label={{ 
                  value: 'Activities', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#60A5FA" 
                strokeWidth={3}
                dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
