import { Button } from "@/components/base/buttons/button";
import { SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <main className="p-7">
      <div className="p-25 space-y-1">
        <header className="flex justify-end">
          {!userId ? (
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <Button color="link-color" size="lg">
                  Sign In
                </Button>
              </SignInButton>
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
      <img src="/books-dark.svg" alt="" className="absolute right-[10%] top-[30%] h-100 w-100 object-contain pointer-events-none" />
      <img src="/clipboard.svg" alt="" className="absolute left-[20%] bottom-[20%] opacity-75 -rotate-20 h-50 w-50 object-contain pointer-events-none" />
    </main>
  );
}
