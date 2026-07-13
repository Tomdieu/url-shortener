import NavBar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import getCurrentUser from '@/lib/getCurrentUser'
import DashboardBreadCumb from '@/components/DashboardBreadCumb'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Trix URL | Dashboard',
  description: 'Manage your shortened links and analytics',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: 'var(--surface)', color: 'var(--ink)' }}>
      <aside className="hidden lg:block w-56 flex-shrink-0 border-r" style={{ borderColor: 'var(--border)' }}>
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <NavBar user={currentUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 md:px-6 py-4">
            <DashboardBreadCumb />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
