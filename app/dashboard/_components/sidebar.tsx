"use client";

import {
    OrganizationSwitcher,
    UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Settings,
    CircleCheck,
    LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { OrgSettings } from "@/components/OrgSettings";

interface SidebarProps {
    fullName: string | null;
    role: string | null;
}

type SidebarLink = {
    title: string;
    href: string;
    icon: LucideIcon;
};

const teacherLinks: SidebarLink[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Assignments",
        href: "/dashboard/assignments",
        icon: BookOpen,
    },
    {
        title: "Members",
        href: "/dashboard/members",
        icon: Users,
    }
];

const studentLinks: SidebarLink[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Assignments",
        href: "/dashboard/assignments",
        icon: BookOpen,
    },
    {
        title: "Grades",
        href: "/dashboard/grades",
        icon: CircleCheck,
    },
];

export function Sidebar({
    fullName,
    role,
}: SidebarProps) {
    const pathname = usePathname();

    const isTeacher =
        role === "org:admin";

    const links = isTeacher
        ? teacherLinks
        : studentLinks;



    return (
        <aside className="w-1/4 shrink-0 h-full border-r border-primary p-4 flex flex-col">
            <div className="space-y-6">
                <div className="flex items-center gap-4 select-none">
                    <Image
                        src="/books-dark.svg"
                        alt="StudyStack"
                        width={40}
                        height={40}
                    />

                    <h1 className="text-2xl font-bold tracking-wide text-primary">
                        StudyStack
                    </h1>
                </div>

                <OrganizationSwitcher hidePersonal />

                <nav className="flex flex-col gap-1">
                    {links.map((link) => {
                        const isActive =
                            pathname ===
                            link.href
                            || pathname.startsWith(
                                `${link.href}/`
                            );

                        return (
                            <a key={link.href} href={link.href}>
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className={cn(
                                        "w-full justify-start rounded-xl px-3 py-3 text-primary hover:bg-purple-300/20",
                                        isActive &&
                                        "bg-purple-300 text-primary"
                                    )}
                                >
                                    <link.icon />
                                    {link.title}
                                </Button>
                            </a>
                        );
                    })}
                    <OrgSettings />
                </nav>
            </div>

            <div className="mt-auto border-t border-primary pt-4 flex items-center gap-3">
                <UserButton />

                <div className="min-w-0">
                    <p className="truncate font-semibold text-primary">
                        {fullName}
                    </p>

                    <p className="text-sm text-chart-4">
                        {isTeacher
                            ? "Teacher"
                            : "Student"}
                    </p>
                </div>
            </div>

        </aside>
    );
}