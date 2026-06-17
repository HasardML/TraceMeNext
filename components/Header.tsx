import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-base font-semibold text-foreground transition-colors hover:text-muted-foreground"
        >
          AI 旅行规划器
        </Link>

        <nav aria-label="主导航">
          <Link
            href="/plans"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            我的计划
          </Link>
        </nav>
      </div>
    </header>
  );
}
