import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

export default async function DashLayout({
    children,
}: LayoutProps) {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const { orgId } = await auth();

    if (!orgId) {
        redirect("/onboarding");
    }

    return (
        <div className="p-5 h-full">
            <main className="h-full w-full border border-brand-800 rounded-xl bg-brand-200/40 backdrop-blur-xs p-5 flex gap-x-2">
                <aside className="min-w-[20%] h-full border-r border-brand-800 p-2 flex flex-col">
                    <div className="space-y-3">
                        <div className="flex gap-x-4 items-center pointer-events-none select-none">
                            <img
                                src="/books-dark.svg"
                                alt=""
                                className="h-10 w-10 object-contain"
                            />
                            <h1 className="text-brand-900 font-bold text-2xl tracking-wide">
                                StudyStack
                            </h1>
                        </div>

                        <OrganizationSwitcher hidePersonal />
                    </div>

                    <div className="mt-auto flex items-center gap-3 pt-4">
                        <UserButton />
                        <div>
                            <p className="text-brand-900 font-semibold text-lg">
                                {user.fullName}
                            </p>
                        </div>
                    </div>
                </aside>
                <div className="p-3 pl-5 w-full">
                    {children}
                </div>
            </main>
        </div>
    )
}