import { TravelForm } from "@/components/TravelForm";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">
        <section className="lg:sticky lg:top-6 lg:self-start">
          <TravelForm />
        </section>

        <section className="lg:col-span-2">
          <div className="min-h-[420px] rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-card-foreground">
              结果展示区域
            </h2>
          </div>
        </section>
      </div>
    </main>
  );
}
