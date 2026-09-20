"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type IconName = "home" | "plan" | "foods" | "workouts" | "progress" | "profile" | "leaf";

function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };

  if (name === "home") {
    return (
      <svg {...common}>
        <path d="M3 11.2 12 4l9 7.2" />
        <path d="M5.5 10.5V20h13v-9.5" />
        <path d="M9.5 20v-5.5h5V20" />
      </svg>
    );
  }

  if (name === "plan") {
    return (
      <svg {...common}>
        <rect x="4" y="5" width="16" height="15" rx="2.5" />
        <path d="M8 3v4M16 3v4M4 9h16" />
        <path d="m8.2 14 2.1 2.1 5-5" />
      </svg>
    );
  }

  if (name === "foods") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.4" />
        <path d="m16 16 4.2 4.2" />
        <path d="M8.7 9.2c.9-.9 2.4-1 3.4-.2" />
      </svg>
    );
  }

  if (name === "workouts") {
    return (
      <svg {...common}>
        <path d="M6 8v8M18 8v8M3.5 10v4M20.5 10v4M6 12h12" />
      </svg>
    );
  }

  if (name === "progress") {
    return (
      <svg {...common}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-4 3 2 5-6" />
        <path d="M16 7h3v3" />
      </svg>
    );
  }

  if (name === "profile") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 20c.5-4 2.8-6.2 6.5-6.2s6 2.2 6.5 6.2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 20c-.2-6.8 1.1-11.5 4.7-15.4" />
      <path d="M12.3 11.2C7.7 11.2 5.2 8.8 5 5c4.8-.3 7.6 1.9 7.3 6.2Z" />
      <path d="M13 14.2c4.3.2 6.7-2 7-5.6-4.6-.4-7.3 1.6-7 5.6Z" />
    </svg>
  );
}

const nav: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/plan", label: "My Plan", icon: "plan" },
  { href: "/foods", label: "Foods", icon: "foods" },
  { href: "/workouts", label: "Workouts", icon: "workouts" },
  { href: "/progress", label: "Progress", icon: "progress" },
  { href: "/profile", label: "Profile", icon: "profile" }
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1320px] lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="hidden min-h-screen border-r border-forest-700/60 bg-forest-950/45 p-6 lg:block">
        <div className="sticky top-6">
          <div className="mb-10 flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-forest-500 bg-forest-800 text-forest-200">
              <Icon name="leaf" size={31} />
            </div>
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
                  className={`flex min-h-[54px] items-center gap-3 rounded-2xl px-4 py-3 text-[16px] font-bold transition ${
                    active ? "bg-forest-700 text-cream-50" : "text-forest-200/75 hover:bg-forest-800"
                  }`}
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${active ? "bg-forest-600" : "bg-forest-800"} text-forest-200`}>
                    <Icon name={item.icon} size={25} />
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="min-w-0 pb-32 lg:pb-8">
        <header className="sticky top-0 z-40 border-b border-forest-700/50 bg-forest-950/88 px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))] backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-[920px] items-center justify-between">
            <Link href="/" className="flex min-h-[52px] items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-forest-500 bg-forest-800 text-forest-200">
                <Icon name="leaf" size={29} />
              </div>
              <span className="font-serif text-[24px] leading-none text-cream-50">My Fitness &amp; Diet</span>
            </Link>

            <Link
              href="/profile"
              aria-label="Profile"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-forest-600 bg-forest-800 text-forest-200"
            >
              <Icon name="profile" size={28} />
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1000px] px-4 py-5 md:px-7 md:py-8">
          {children}
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-forest-700/70 bg-forest-900/97 px-1.5 pb-[max(9px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-[650px] grid-cols-6">
            {nav.map(item => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`grid min-h-[64px] place-items-center content-center gap-1 rounded-2xl px-1 py-1 text-[11px] font-extrabold leading-none transition ${
                    active ? "text-cream-50" : "text-forest-300/65"
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full transition ${
                      active
                        ? "bg-forest-600 text-cream-50 shadow-lg shadow-black/15"
                        : "text-forest-200"
                    }`}
                  >
                    <Icon name={item.icon} size={27} />
                  </span>
                  <span className="mt-0.5 whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
