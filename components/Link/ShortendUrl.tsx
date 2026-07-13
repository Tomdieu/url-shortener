'use client'

import { linkSchema, LinkType } from '@/schema/link.schema'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { create } from '@/lib/actions/links'
import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link2, ArrowRight, Loader2 } from 'lucide-react'

const UrlShortenerForm = ({ showBorder = true }: { showBorder?: boolean }) => {
  const form = useForm<LinkType>({
    resolver: zodResolver(linkSchema),
    mode: 'onBlur',
  })
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ['shortend-url'],
    mutationFn: async (value: LinkType) => create(value),
  })

  const onSubmit = async (value: LinkType) => {
    mutate(value, {
      onSuccess: (res) => {
        if (res.success) {
          queryClient.invalidateQueries({ queryKey: ['links'], exact: true })
          toast.success('URL shortened successfully')
          router.push('/dashboard/links/' + res?.data?.short)
        } else {
          toast.error('Something went wrong')
        }
      },
    })
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Shorten URL</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--ink-muted)' }}>
        Paste a long URL and get a short, trackable link
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="original" className="text-sm font-medium">
            URL
          </label>
          <div className="flex items-center gap-0 rounded-xl border p-1.5 transition-colors focus-within:ring-2 focus-within:ring-offset-1"
            style={{
              borderColor: form.formState.errors.original ? '#ef4444' : 'var(--border)',
              ['--tw-ring-color' as string]: 'oklch(0.72 0.15 195)',
            }}
          >
            <div className="flex items-center pl-3">
              <Link2 className="h-4 w-4" style={{ color: 'var(--ink-muted)' }} />
            </div>
            <input
              id="original"
              type="url"
              placeholder="https://example.com/very/long/url"
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
              style={{ color: 'var(--ink)' }}
              {...form.register('original')}
            />
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary !rounded-lg !px-4 !py-2 !text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Shorten
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
          {form.formState.errors.original && (
            <p className="text-xs text-red-500 mt-1">
              {form.formState.errors.original.message}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default UrlShortenerForm
