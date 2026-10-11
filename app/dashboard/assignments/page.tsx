import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { assignments, assignmentCompletions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";

function getAssignmentStatus(dueDate: Date, isCompleted: boolean): {
    status: "completed" | "pending" | "due-soon" | "overdue";
    color: string;
    label: string;
} {
    if (isCompleted) {
        return {
            status: "completed",
            color: "bg-green-500/10 text-green-700 border-green-500",
            label: "Completed",
        };
    }

    const now = new Date();
    const diffInHours = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 0) {
        return {
            status: "overdue",
            color: "bg-red-500/10 text-red-700 border-red-500",
            label: "Overdue",
        };
    }

    if (diffInHours <= 24) {
        return {
            status: "due-soon",
            color: "bg-orange-500/10 text-orange-700 border-orange-500",
            label: "Due Soon",
        };
    }

    return {
        status: "pending",
        color: "bg-blue-500/10 text-blue-700 border-blue-500",
        label: "Pending",
    };
}

export default async function AssignmentsPage() {
    const { orgId, orgRole, userId } = await auth();

    if (!orgId) {
        redirect("/onboarding");
    }

    const isTeacher = orgRole === "org:admin";

    const data = await db.query.assignments.findMany({
        where: eq(assignments.orgId, orgId!),
        orderBy: desc(assignments.createdAt),
    });

    // Get completion data for current user if student
    const completedAssignmentIds = !isTeacher
        ? (
              await db.query.assignmentCompletions.findMany({
                  where: eq(assignmentCompletions.studentId, userId!),
              })
          ).map((c) => c.assignmentId)
        : [];

    return (
        <div className="h-full w-full p-6 flex flex-col gap-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-primary">Assignments</h1>
                {isTeacher && (
                    <Button asChild>
                        <Link href="/dashboard/assignments/new">
                            Create Assignment
                        </Link>
                    </Button>
                )}
            </div>

            {data.length !== 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((assignment) => {
                        const isCompleted = completedAssignmentIds.includes(
                            assignment.id
                        );
                        const { color, label } = getAssignmentStatus(
                            assignment.dueDate,
                            isCompleted
                        );

                        return (
                            <Link
                                key={assignment.id}
                                href={`/dashboard/assignments/${assignment.id}`}
                                className="group"
                            >
                                <div className="h-full p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md flex flex-col gap-3 cursor-pointer">
                                    <div className="flex items-start justify-between gap-2">
                                        <h2 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors line-clamp-2 flex-1">
                                            {assignment.title}
                                        </h2>
                                        <Badge
                                            variant="outline"
                                            className={`shrink-0 ${color} border`}
                                        >
                                            {label}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {assignment.description}
                                    </p>

                                    <div className="mt-auto pt-2">
                                        <p className="text-xs text-muted-foreground">
                                            Due:{" "}
                                            <span className="font-semibold">
                                                {new Date(
                                                    assignment.dueDate
                                                ).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </p>
                                    </div>

                                    <Button
                                        size="sm"
                                        className="w-full mt-2 group-hover:bg-primary/90"
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        Open Assignment
                                    </Button>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-lg text-muted-foreground font-medium">
                        No assignments yet!
                    </p>
                </div>
            )}
        </div>
    );
}
