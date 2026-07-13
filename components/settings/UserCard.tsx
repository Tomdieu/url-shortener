'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, passwordSchema, ProfileType, PasswordType } from '@/schema/user.schema'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { User } from '@/lib/generated/prisma/client'
import { toast } from 'react-hot-toast'
import { updateProfile, updatePassword } from '@/lib/updateUser'
import { Loader2 } from 'lucide-react'

type UserCardProps = {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  const profileForm = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
    },
    mode: 'onBlur',
  })

  const passwordForm = useForm<PasswordType>({
    resolver: zodResolver(passwordSchema),
    mode: 'onBlur',
  })

  const profileMutation = useMutation({
    mutationKey: ['update-profile'],
    mutationFn: updateProfile,
  })

  const passwordMutation = useMutation({
    mutationKey: ['update-password'],
    mutationFn: updatePassword,
  })

  const onProfileSubmit = (value: ProfileType) => {
    const unchanged = value.name === (user.name || '') && value.email === (user.email || '')
    if (unchanged) {
      toast.success('No changes to save')
      return
    }
    profileMutation.mutate(value, {
      onSuccess: (res) => {
        if (res.success) {
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      },
    })
  }

  const onPasswordSubmit = (value: PasswordType) => {
    passwordMutation.mutate(value, {
      onSuccess: (res) => {
        if (res.success) {
          toast.success(res.message)
          passwordForm.reset()
        } else {
          toast.error(res.message)
        }
      },
    })
  }

  const hasPassword = Boolean(user.hashedPassword)

  return (
    <div className="max-w-lg space-y-8">
      {/* Profile Section */}
      <div>
        <h2 className="text-lg font-semibold mb-1">Profile</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--ink-muted)' }}>
          Update your name and email
        </p>

        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              {...profileForm.register('name')}
            />
            {profileForm.formState.errors.name && (
              <p className="text-xs text-red-500">
                {profileForm.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...profileForm.register('email')}
            />
            {profileForm.formState.errors.email && (
              <p className="text-xs text-red-500">
                {profileForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={profileMutation.isPending}
            className="btn-primary !rounded-xl !py-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {profileMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Update profile'
            )}
          </button>
        </form>
      </div>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: 'var(--border)' }} />

      {/* Password Section */}
      <div>
        <h2 className="text-lg font-semibold mb-1">Password</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--ink-muted)' }}>
          {hasPassword ? 'Change your password' : 'You signed up with an OAuth provider — no password set'}
        </p>

        {hasPassword ? (
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="currentPassword" className="text-sm font-medium">
                Current password
              </label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                {...passwordForm.register('currentPassword')}
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-xs text-red-500">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="newPassword" className="text-sm font-medium">
                New password
              </label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                {...passwordForm.register('newPassword')}
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="text-xs text-red-500">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                {...passwordForm.register('confirmPassword')}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={passwordMutation.isPending}
              className="btn-primary !rounded-xl !py-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {passwordMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Update password'
              )}
            </button>
          </form>
        ) : (
          <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
            To set a password, please sign up with email and password.
          </p>
        )}
      </div>
    </div>
  )
}
