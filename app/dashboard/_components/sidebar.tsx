"use client";

import {
    OrganizationSwitcher,
    UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import Image from "next/image";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Settings,
    CircleCheck,
    LucideIcon,
} from "lucide-react";
import { cx } from "@/utils/cx";

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
        title: "Students",
        href: "/dashboard/students",
        icon: Users,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
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
        <aside className="w-72 shrink-0 h-full border-r border-brand-800 p-4 flex flex-col">
            <div className="space-y-6">
                <div className="flex items-center gap-4 select-none">
                    <Image
                        src="/books-dark.svg"
                        alt="StudyStack"
                        width={40}
                        height={40}
                    />

                    <h1 className="text-2xl font-bold tracking-wide text-brand-900">
                        StudyStack
                    </h1>
                </div>

                <OrganizationSwitcher hidePersonal />

                <nav className="flex flex-col gap-1">
                    {links.map((link) => {
                        const isActive =
                            pathname ===
                            link.href ||
                            pathname.startsWith(
                                `${link.href}/`
                            );

                        return (
                            <Button
                                key={link.href}
                                href={link.href}
                                color="tertiary"
                                size="xl"
                                iconLeading={
                                    link.icon
                                }
                                className={cx(
                                    "w-full justify-start rounded-xl px-3 py-3 text-brand-700 hover:bg-brand-300/20",
                                    isActive &&
                                    "bg-brand-300 text-brand-900"
                                )}
                            >
                                {link.title}
                            </Button>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto border-t border-brand-800 pt-4 flex items-center gap-3">
                <UserButton />

                <div className="min-w-0">
                    <p className="truncate font-semibold text-brand-900">
                        {fullName}
                    </p>

                    <p className="text-sm text-brand-700">
                        {isTeacher
                            ? "Teacher"
                            : "Student"}
                    </p>
                </div>
            </div>
        </aside>
    );
}