import Link from "next/link";
import Image from "next/image";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { assignments } from "@/db/schema";

import {
    Users,
    UserStar,
    NotebookPen,
    ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default async function TeacherDashboard() {
    const { orgId } = await auth();

    if (!orgId) {
        return null;
    }

    const client = await clerkClient();

    const memberships =
        await client.organizations.getOrganizationMembershipList({
            organizationId: orgId,
        });

    const students = memberships.data.filter(
        (membership) =>
            membership.role === "org:member"
    );

    const teachers = memberships.data.filter(
        (membership) =>
            membership.role === "org:admin"
    );

    const assignmentsData =
        await db.query.assignments.findMany({
            where: eq(
                assignments.orgId,
                orgId
            ),
            orderBy: (
                assignments,
                { desc }
            ) => [
                    desc(assignments.createdAt),
                ],
        });

    const assignmentCount =
        assignmentsData.length;

    return (
        <div className="h-full overflow-auto p-4 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-primary">
                    Hey teacher!
                </h1>

                <p className="text-muted-foreground mt-1">
                    Take a look at your classroom
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-chart-1 border-primary">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <Users className="size-8 text-primary" />

                            <h2 className="text-3xl font-bold text-primary">
                                {students.length}
                            </h2>
                        </div>

                        <h3 className="mt-3 font-semibold">
                            Students
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Enrolled in this classroom.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-chart-1 border-primary">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <UserStar className="size-8 text-primary" />

                            <h2 className="text-3xl font-bold text-primary">
                                {teachers.length}
                            </h2>
                        </div>

                        <h3 className="mt-3 font-semibold">
                            Teachers
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Teaching in this classroom.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-chart-1 border-primary">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <NotebookPen className="size-8 text-primary" />

                            <h2 className="text-3xl font-bold text-primary">
                                {assignmentCount}
                            </h2>
                        </div>

                        <h3 className="mt-3 font-semibold">
                            Assignments
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Created for this classroom.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Quick Actions
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-chart-1 border-primary">
                        <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                            <Image
                                src="/books-dark.svg"
                                alt="Assignments"
                                width={140}
                                height={140}
                            />

                            <div>
                                <h3 className="text-xl font-semibold">
                                    Assignments
                                </h3>

                                <p className="text-muted-foreground text-sm mt-1">
                                    Create assignments here.
                                </p>
                            </div>

                            <Button asChild>
                                <Link href="/dashboard/assignments">
                                    Open Assignments
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-chart-1 border-primary">
                        <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                            <Users className="size-28 text-primary" />

                            <div>
                                <h3 className="text-xl font-semibold">
                                    Members
                                </h3>

                                <p className="text-muted-foreground text-sm mt-1">
                                    View teachers and students in your classroom.
                                </p>
                            </div>

                            <Button asChild>
                                <Link href="/dashboard/members">
                                    Open Members
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="bg-chart-1 border-primary">
                <CardHeader className="pb-3">
                    <CardTitle>
                        Recent Assignments
                    </CardTitle>

                    <CardDescription>
                        Your latest assignments.
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 p-4">
                    {assignmentsData.length === 0 ? (
                        <p className="text-muted-foreground">
                            No assignments created yet.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {assignmentsData
                                .slice(0, 5)
                                .map((assignment) => (
                                    <div
                                        key={assignment.id}
                                        className="flex items-center justify-between rounded-lg border px-3 py-2"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {assignment.title}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                Due{" "}
                                                {new Date(
                                                    assignment.dueDate
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <Button
                                            asChild
                                            variant="outline"
                                        >
                                            <Link
                                                href={`/dashboard/assignments/${assignment.id}`}
                                            >
                                                Open
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}