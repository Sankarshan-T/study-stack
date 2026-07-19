import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    return (
        <main className=" p-8">
            <h1 className="text-2xl font-semibold text-brand-900">Dashboard</h1>
            <p className="mt-2 text-brand-700">You can only see this page when you are signed in.</p>
        </main>
    );
}