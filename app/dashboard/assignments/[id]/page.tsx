import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { db } from "@/db";
import { assignmentCompletions, assignments } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { MoveLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface AssignmentIdPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AssignmentIdPage({
    params,
}: AssignmentIdPageProps) {
    const { id } = await params;
    const { orgId } = await auth();
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

    const completions =
        await db.query.assignmentCompletions.findMany({
            where: eq(
                assignmentCompletions.assignmentId,
                id
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
        <div className="h-full w-full max-h-full overflow-auto flex flex-col gap-y-5">
            <div className="space-y-3">

                <a href="/dashboard/assignments">
                    <Button variant="ghost" className="p-1 hover:bg-chart-1/20">
                        <MoveLeft /> Back
                    </Button>
                </a>
                <div className="flex items-endline gap-3">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold flex gap-3 items-center">
                            {assignment?.title}
                            <div className="flex gap-3 h-fit">
                                <Badge>
                                    Due on: {new Date(assignment.dueDate).toDateString()}
                                </Badge>

                                <Badge variant="secondary">
                                    Created: {new Date(assignment.createdAt).toDateString()}
                                </Badge>
                            </div>
                        </h1>

                        <p className="text-muted-foreground mt-2">
                            {assignment.description}
                        </p>
                        <p className="text-muted-foreground mt-2">
                            Aditional notes: {assignment.aditionalNotes}
                        </p>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-3 gap-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Students
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <p className="text-3xl font-bold">
                            {totalStudents}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Completed
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <p className="text-3xl font-bold text-green-600">
                            {completedCount}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pending
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <p className="text-3xl font-bold text-orange-500">
                            {pendingCount}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Progress
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                    <Progress value={progress} />

                    <p className="text-sm text-muted-foreground">
                        {completedCount} students out of {totalStudents} completed
                    </p>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Completed
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        {completedStudents.map(
                            (student) => (
                                <div
                                    key={
                                        student.id
                                    }
                                    className="flex justify-between items-center rounded-lg border p-3"
                                >
                                    <p>
                                        {
                                            student.publicUserData?.firstName
                                        }
                                    </p>

                                    <Badge>
                                        Done
                                    </Badge>
                                </div>
                            )
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Pending
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        {pendingStudents.map(
                            (student) => (
                                <div
                                    key={
                                        student.id
                                    }
                                    className="flex justify-between items-center rounded-lg border p-3"
                                >
                                    <p>
                                        {
                                            student.publicUserData?.firstName
                                        }
                                    </p>

                                    <Badge
                                        variant="secondary"
                                    >
                                        Pending
                                    </Badge>
                                </div>
                            )
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}