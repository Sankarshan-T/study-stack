import { Button } from "@/components/base/buttons/button";

export default function Home() {
  return (
    <main className="p-7">
      <div className="p-20 space-y-1">
        <h1 className="text-7xl font-bold uppercase tracking-wide text-brand-900"> Study Stack</h1>
        <h3 className="text-lg max-w-[70%] font-mono tracking-widest text-brand-900">
          A great option for tracking your students' work. Assign tasks to your students with ease!
        </h3>
        <a href="/dashboard">
          <Button className="mt-4">
            Open dashboard
          </Button>
        </a>
      </div>
      <img src="/books-dark.svg" alt="" className="absolute right-[6%] top-[25%] h-100 w-100 object-contain pointer-events-none" />
      <img src="/clipboard.svg" alt="" className="absolute left-[10%] bottom-[10%] opacity-75 -rotate-20 h-50 w-50 object-contain pointer-events-none" />
    </main>
  );
}
