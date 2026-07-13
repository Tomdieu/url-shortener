import SidebarSettings from '@/components/settings/SidebarSettings'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-6">
      <div className="w-48 flex-shrink-0">
        <SidebarSettings />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
