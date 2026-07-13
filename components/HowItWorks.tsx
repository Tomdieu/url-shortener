import { ClipboardPaste, MousePointerClick, LineChart } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: ClipboardPaste,
    title: 'Paste your URL',
    description:
      'Drop any long link into the input. We handle URLs from any source — blogs, social media, emails, documents.',
  },
  {
    num: '02',
    icon: MousePointerClick,
    title: 'Get your short link',
    description:
      'Your compact link is ready instantly. Copy it, share it, or download the auto-generated QR code.',
  },
  {
    num: '03',
    icon: LineChart,
    title: 'Track performance',
    description:
      'Open your dashboard to see who clicked, when, where, and from what device. Data updates in real time.',
  },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="landing-section">
      <div className="landing-container">
        <div className="max-w-2xl mb-14">
          <h2 className="landing-heading text-3xl sm:text-4xl md:text-5xl mb-4">
            Three steps. That&apos;s it.
          </h2>
          <p className="landing-subtext text-base sm:text-lg">
            No complicated setup. No learning curve. Shorten, share, and track
            in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%+0.5rem)] w-[calc(100%-4rem)] h-px bg-zinc-200 dark:bg-zinc-800" />
              )}
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                  <step.icon className="h-7 w-7 text-zinc-600 dark:text-zinc-300" strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <span className="stat-number text-xs text-zinc-400 dark:text-zinc-500 mb-1 block">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-semibold mb-1.5 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
