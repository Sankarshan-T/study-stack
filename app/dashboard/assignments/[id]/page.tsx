import { completeAssignment } from "@/app/actions/complete-assignment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { db } from "@/db";
import { assignmentCompletions, assignments } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { MoveLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { StudentAssignment } from "../_components/studentAssignment";
import { DeleteAssignment } from "../_components/deleteAssignment";

interface AssignmentIdPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AssignmentIdPage({
    params,
}: AssignmentIdPageProps) {
    const { id } = await params;
    const { orgId, userId, orgRole } = await auth();
    const client = await clerkClient();

    const assignment =
        await db.query.assignments.findFirst({
            where: eq(
                assignments.id,
                id,
            ),
        });

    if (!assignment) {
        notFound();
    }

    const role = orgRole == "org:admin" ? "teacher" : "student"

    const completions =
        await db.query.assignmentCompletions.findMany({
            where: eq(
                assignmentCompletions.assignmentId,
                id
            ),
        });

    const completion =
        await db.query.assignmentCompletions.findFirst({
            where: and(
                eq(
                    assignmentCompletions.assignmentId,
                    id
                ),
                eq(
                    assignmentCompletions.studentId,
                    userId!
                )
            ),
        });

    const memberships =
        await client.organizations.getOrganizationMembershipList({
            organizationId: orgId!,
        });

    const students =
        memberships.data.filter(
            (m) =>
                m.role ===
                "org:member"
        );

    if (!students) return;

    const totalStudents =
        students.length;

    const completedCount =
        completions.length;

    const pendingCount =
        totalStudents -
        completedCount;

    const progress =
        totalStudents === 0
            ? 0
            : (
                completedCount /
                totalStudents
            ) * 100;

    const completedIds =
        new Set(
            completions.map(
                (c) => c.studentId
            )
        );

    const completedStudents =
        students.filter((student) =>
            student.publicUserData?.userId &&
            completedIds.has(
                student.publicUserData.userId
            )
        );

    const pendingStudents =
        students.filter((student) =>
            !student.publicUserData?.userId ||
            !completedIds.has(
                student.publicUserData.userId
            )
        );



    return (
        <div className="h-full w-full max-h-full overflow-auto flex flex-col gap-6 p-2 md:p-4">
            <div className="space-y-4">
                <a href="/dashboard/assignments" className="inline-block">
                    <Button variant="ghost" className="rounded-full border border-border/60 bg-background/80 p-2.5 shadow-sm transition-colors hover:bg-accent/50">
                        <MoveLeft className="h-4 w-4" />
                        <span className="ml-1">Back</span>
                    </Button>
                </a>

                <div className="rounded-2xl border bg-card/80 p-5 shadow-sm backdrop-blur-sm">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                    {assignment?.title}
                                </h1>

                                {role === "teacher" && (
                                    <div className="ml-auto xl:ml-0">
                                        <DeleteAssignment
                                            assignmentId={assignment.id}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="rounded-full border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-200">
                                    Due on: {new Date(assignment.dueDate).toDateString()}
                                </Badge>

                                <Badge variant="secondary" className="rounded-full">
                                    Created: {new Date(assignment.createdAt).toDateString()}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 space-y-3 border-t pt-4 text-sm text-muted-foreground">
                        <p className="leading-6 text-foreground/90">
                            {assignment.description}
                        </p>
                        <p className="leading-6">
                            Additional notes: {assignment.aditionalNotes}
                        </p>
                    </div>
                </div>
            </div>

            {role === "teacher" ? (
                <div className="w-full h-full space-y-5">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/80 dark:to-slate-950">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Total Students
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <p className="text-3xl font-bold tracking-tight text-foreground">
                                    {totalStudents}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-950/80">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Completed
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <p className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                                    {completedCount}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/40 dark:to-orange-950/80">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Pending
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <p className="text-3xl font-bold tracking-tight text-orange-500 dark:text-orange-300">
                                    {pendingCount}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">
                                Progress
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            <div className="rounded-full bg-muted/80 p-1">
                                <Progress value={progress} className="h-3" />
                            </div>

                            <p className="text-sm text-muted-foreground">
                                {completedCount} students out of {totalStudents} completed
                            </p>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 lg:grid-cols-2">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                                    Completed
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                {completedStudents.length === 0 ? (
                                    <div className="rounded-lg border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
                                        No students have completed this assignment yet.
                                    </div>
                                ) : completedStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between gap-3 rounded-xl border bg-background/70 p-3 shadow-sm"
                                    >
                                        <p className="font-medium text-foreground">
                                            {student.publicUserData?.firstName ?? student.publicUserData?.lastName ?? "Student"}
                                        </p>

                                        <Badge className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                                            Done
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-orange-500 dark:text-orange-300">
                                    Pending
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                {pendingStudents.length === 0 ? (
                                    <div className="rounded-lg border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
                                        All students have completed this assignment.
                                    </div>
                                ) : pendingStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between gap-3 rounded-xl border bg-background/70 p-3 shadow-sm"
                                    >
                                        <p className="font-medium text-foreground">
                                            {student.publicUserData?.firstName ?? student.publicUserData?.lastName ?? "Student"}
                                        </p>

                                        <Badge variant="secondary" className="rounded-full">
                                            Pending
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : (
                <StudentAssignment
                    assignmentId={id}
                    completion={
                        completion
                            ? {
                                startTime:
                                    completion.startTime,
                                endTime:
                                    completion.endTime,
                            }
                            : null
                    }
                />
            )}

        </div >
    )
}
