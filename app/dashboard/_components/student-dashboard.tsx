import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { assignmentCompletions, assignments } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq, and, gte } from "drizzle-orm";
import { Notebook, NotebookPen, Pencil } from "lucide-react";

export default async function StudentDashboard() {
    const { orgId, userId } = await auth();

    if (!orgId) {
        return null;
    }

    const client = await clerkClient();

    const assignmentsData =
        await db.query.assignments.findMany({
            where: eq(
                assignments.orgId,
                orgId
            ),
        });

    const completedAssignmentsData =
        await db.query.assignmentCompletions.findMany({
            where: eq(
                assignmentCompletions.studentId,
                userId!
            ),
        });

    const upcomingAssignments =
        await db.query.assignments.findMany({
            where: eq(
                assignments.orgId,
                orgId
            ),
            orderBy: (
                assignments,
                { asc }
            ) => [asc(assignments.dueDate)],
            limit: 3,
        });

    const assignmentCount =
        assignmentsData.length;

    const completedAssignmentsCount =
        completedAssignmentsData.length;

    return (
        <div className="h-full w-full p-3 flex flex-col gap-6">
            <h1 className="text-2xl text-primary font-semibold">Hey student!</h1>

            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl p-3 flex items-center gap-x-3 bg-chart-1 border border-primary">
                    <Notebook height={30} width={30} className="text-primary" />
                    <div>
                        <h2 className="text-lg font-medium text-primary">
                            {assignmentCount} {assignmentCount === 1 ? "assignment" : "assignments"}
                        </h2>
                        <h3 className="text-xs font-mono">
                            {assignmentCount} {assignmentCount === 1 ? "assignment" : "assignments"} pending.
                        </h3>
                    </div>
                </div>
                <div className="rounded-xl p-3 flex items-center gap-x-3 bg-chart-1 border border-primary">
                    <NotebookPen height={30} width={30} className="text-primary" />
                    <div>
                        <h2 className="text-lg font-medium text-primary">
                            {completedAssignmentsCount} {completedAssignmentsCount === 1 ? "assignment" : "assignments"}
                        </h2>
                        <h3 className="text-xs font-mono">
                            {completedAssignmentsCount} {completedAssignmentsCount === 1 ? "assignment" : "assignments"} completed.
                        </h3>
                    </div>
                </div>
                <div className="rounded-xl p-3 flex items-center gap-x-3 bg-chart-1 border border-primary">
                    <Pencil height={30} width={30} className="text-primary" />
                    <div>
                        <h2 className="text-lg font-medium text-primary">
                            {assignmentCount + completedAssignmentsCount} {assignmentCount + completedAssignmentsCount === 1 ? "assignment" : "assignments"}
                        </h2>
                        <h3 className="text-xs font-mono">
                            Total of {assignmentCount + completedAssignmentsCount} {assignmentCount + completedAssignmentsCount === 1 ? "assignment" : "assignments"} in your class.
                        </h3>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-3 p-7">
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 h-fit w-fit">
                        {upcomingAssignments.length === 0 ? (
                            <p>No upcoming assignments!</p>
                        ) : (
                            upcomingAssignments.map((assignment) => (
                                <div
                                    key={assignment.id}
                                    className="flex items-center justify-between rounded-lg border gap-3 p-3"
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
                                    <a href={`/dashboard/assignments/${assignment.id}`}>
                                        <Button>
                                            Open
                                        </Button>
                                    </a>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}