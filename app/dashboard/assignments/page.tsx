import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { assignments } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AssignmensPage() {
    const { orgId, orgRole } =
        await auth();

    if (!orgId) {
        redirect("/onboarding");
    }

    const isTeacher = orgRole === "org:admin";

    const data =
        await db.query.assignments.findMany({
            where: eq(
                assignments.orgId,
                orgId!
            ),
            orderBy: desc(
                assignments.createdAt
            ),
        });

    return (
        <div className="h-full w-full p-3 flex flex-col gap-y-3">
            <h1 className="text-2xl text-primary font-semibold">Assignments:</h1>
            {isTeacher &&
                <Button asChild>
                    <Link href="/dashboard/assignments/new">
                        Create Assignment
                    </Link>
                </Button>
            }
            <div className="flex-1 grid grid-cols-3 p-2">
                {data.map((assignment) => (
                    <div
                        key={assignment.id}
                        className="p-3 rounded-lg bg-card flex flex-col h-fit border border-primary"
                    >
                        <p className="text-lg font-medium text-primary underline">{assignment.title}:</p>
                        <p className="text-xs font-mono text-chart-5 line-clamp-3">{assignment.description}</p>

                        <a
                            href={`/dashboard/assignments/${assignment.id}`}
                        >
                            <Button
                                size={"icon"}
                                className="w-full text-sm font-mono h-fit p-1 mt-4"
                            >
                                Open
                            </Button>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}