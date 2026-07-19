import { Button } from "@/components/base/buttons/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <main className="p-7">
      <div className="p-20 space-y-1">
        <header className="fixed top-5 right-5 mb-4 flex justify-end">
          {!userId ? (
            <div className="flex items-center gap-2">
              <Button color="link-color">
                <SignInButton />
              </Button>
            </div>
          ) : (
            <UserButton />
          )}
        </header>

        <h1 className="text-7xl font-bold uppercase tracking-wide text-brand-900"> Study Stack</h1>
        <h3 className="text-lg max-w-[70%] font-mono tracking-widest text-brand-900">
          A great option for tracking your students' work. Assign tasks to your students with ease!
        </h3>
        <a href="/dashboard">
          <Button className="mt-4">
            {!userId ? "Login" : "Open Dashboard"}
          </Button>
        </a>
      </div>
      <img src="/books-dark.svg" alt="" className="absolute right-[6%] top-[25%] h-100 w-100 object-contain pointer-events-none" />
      <img src="/clipboard.svg" alt="" className="absolute left-[10%] bottom-[10%] opacity-75 -rotate-20 h-50 w-50 object-contain pointer-events-none" />
    </main>
  );
}
