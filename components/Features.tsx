import { BarChart3, Link2, QrCode, Shield } from 'lucide-react'

const features = [
  {
    icon: Link2,
    title: 'Instant shortening',
    description:
      'Paste any URL and get a clean, memorable link in under a second. No signup, no friction.',
    accent: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400',
  },
  {
    icon: BarChart3,
    title: 'Real-time analytics',
    description:
      'Track every click with geographic data, referrer breakdowns, device types, and browser stats.',
    accent: 'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400',
  },
  {
    icon: QrCode,
    title: 'QR code generation',
    description:
      'Auto-generate scannable QR codes for every short link. Download as PNG for print or digital use.',
    accent: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  },
  {
    icon: Shield,
    title: 'Spam & abuse protection',
    description:
      'Built-in link validation blocks malicious URLs before they spread. Keep your audience safe.',
    accent: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  },
]

const Features = () => {
  return (
    <section id="features" className="landing-section bg-zinc-50 dark:bg-zinc-900/50">
      <div className="landing-container">
        <div className="max-w-2xl mb-14">
          <h2 className="landing-heading text-3xl sm:text-4xl md:text-5xl mb-4">
            Everything you need
          </h2>
          <p className="landing-subtext text-base sm:text-lg">
            Not just shorter links. A complete toolkit for managing, tracking,
            and protecting your links at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card group">
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${feature.accent} mb-5`}>
                <feature.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
