import Link from "next/link";
import Image from "next/image";
import ThemeButton from "@/components/ThemeButton";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[55%] relative flex-col bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,oklch(0.72_0.15_195/0.15),transparent_60%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.72_0.15_195/0.08),transparent_60%)]" />
        </div>

        <div className="relative z-10 flex flex-col h-full px-12 py-8">
          <div className="flex items-center justify-between mb-auto">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/icon.png"
                width={32}
                height={32}
                alt="Trix URL"
                className="w-8 h-8"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                Trix URL
              </span>
            </Link>
            <ThemeButton />
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-tight mb-4">
              Short links.
              <br />
              <span className="text-cyan-400">Big insights.</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Transform long URLs into clean, trackable links. Monitor every
              click with real-time analytics.
            </p>
          </div>

          <div className="mt-auto flex items-center gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Free to use
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              No credit card
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white dark:bg-zinc-950">
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/icon.png"
              width={28}
              height={28}
              alt="Trix URL"
              className="w-7 h-7"
            />
            <span className="text-base font-bold tracking-tight">Trix URL</span>
          </Link>
          <ThemeButton />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
