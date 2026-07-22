import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { assignments } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AssignmensPage() {
    const { orgId } =
        await auth();

    if (!orgId) {
        redirect("/onboarding");
    }

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
        <div className="h-full w-full p-3">
            <h1 className="text-2xl text-primary font-semibold">Assignments:</h1>
            <Button asChild>
                <Link href="/dashboard/assignments/new">
                    Create Assignment
                </Link>
            </Button>
            {data.map((assignment) => (
                <div key={assignment.id}>
                    <p>{assignment.title}</p>
                    <p>{assignment.id}</p>

                    <Link
                        href={`/dashboard/assignments/${assignment.id}`}
                    >
                        Open
                    </Link>
                </div>
            ))}
        </div>
    )
}