"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/plan", label: "My Plan", icon: "☘" },
  { href: "/foods", label: "Foods", icon: "⌕" },
  { href: "/workouts", label: "Workouts", icon: "◒" },
  { href: "/progress", label: "Progress", icon: "↗" },
  { href: "/profile", label: "Profile", icon: "☺" }
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1320px] lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="hidden min-h-screen border-r border-forest-700/60 bg-forest-950/45 p-6 lg:block">
        <div className="sticky top-6">
          <div className="mb-10 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-forest-500 bg-forest-800 text-2xl text-forest-200">❧</div>
            <div>
              <div className="font-serif text-[24px] leading-none text-cream-50">My Fitness</div>
              <div className="font-serif text-[24px] leading-none text-cream-50">&amp; Diet</div>
            </div>
          </div>
          <nav className="space-y-2">
            {nav.map(item => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[16px] font-bold transition ${
                    active ? "bg-forest-700 text-cream-50" : "text-forest-200/75 hover:bg-forest-800"
                  }`}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-forest-800 text-forest-200">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="min-w-0 pb-28 lg:pb-8">
        <header className="sticky top-0 z-40 border-b border-forest-700/50 bg-forest-950/85 px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))] backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-[920px] items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-forest-500 bg-forest-800 text-xl text-forest-200">❧</div>
              <span className="font-serif text-[23px] text-cream-50">My Fitness &amp; Diet</span>
            </Link>
            <Link href="/profile" className="grid h-10 w-10 place-items-center rounded-full border border-forest-600 bg-forest-800 text-forest-200">☺</Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1000px] px-4 py-5 md:px-7 md:py-8">
          {children}
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-forest-700/70 bg-forest-900/96 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-[620px] grid-cols-6">
            {nav.map(item => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} className={`grid place-items-center gap-1 rounded-xl py-2 text-[10px] font-bold ${active ? "text-forest-200" : "text-forest-300/55"}`}>
                  <span className={`grid h-8 w-8 place-items-center rounded-full ${active ? "bg-forest-700" : ""}`}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
