'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import getCurrentUser from '@/lib/getCurrentUser'
import React, { useEffect, useState } from 'react'
import { getAllMonthsAnalyticsByYear } from '@/lib'
import CustomLineChart from '@/components/charts/CustomLineChart'

function getYearsBetween(startYear: number, endYear: number) {
  const years: number[] = []
  if (startYear > endYear) {
    ;[startYear, endYear] = [endYear, startYear]
  }
  for (let year = startYear; year <= endYear; year++) {
    years.push(year)
  }
  return years
}

export default function Analytics() {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => getCurrentUser(),
  })
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [listYear, setListYear] = useState<number[]>([])

  useEffect(() => {
    if (data) {
      const userJoinedYear = data.createdAt.getFullYear()
      const currentYear = new Date().getFullYear()
      setListYear(getYearsBetween(userJoinedYear, currentYear))
    }
  }, [data])

  const { data: analyticsData, isLoading, refetch } = useQuery({
    queryKey: ['analytics', year],
    queryFn: async () => getAllMonthsAnalyticsByYear(year),
    enabled: data != null,
  })

  useEffect(() => {
    refetch()
  }, [year, refetch])

  return (
    <div
      className="rounded-xl border p-5"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Monthly clicks</h3>
        {year && (
          <Select onValueChange={(value) => setYear(parseInt(value))} value={year.toString()}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Year</SelectLabel>
                {listYear.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      <div>
        {!isLoading && analyticsData && (
          <CustomLineChart
            type="monotone"
            tooltip={true}
            xDataKey="timestamp"
            data={analyticsData}
            datakey="clicks"
            fill="#000"
            className="w-full"
            height={400}
          />
        )}
      </div>
    </div>
  )
}
