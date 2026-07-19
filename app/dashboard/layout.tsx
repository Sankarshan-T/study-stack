import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { Sidebar } from "./_components/sidebar";

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

    const { orgId, orgRole } = await auth();

    if (!orgId) {
        redirect("/onboarding");
    }

    return (
        <div className="p-5 h-full">
            <main className="h-full w-full border border-brand-800 rounded-xl bg-brand-200/40 backdrop-blur-xs p-5 flex gap-x-2">
                <Sidebar
                    fullName={user.fullName}
                    role={orgRole || ""}
                />

                <div className="p-3 pl-5 w-full">
                    {children}
                </div>
            </main>
        </div>
    )
}