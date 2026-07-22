import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { assignments } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NotebookPen, Users, UserStar } from "lucide-react";
import Image from "next/image";

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

    const students =
        memberships.data.filter(
            (membership) =>
                membership.role ===
                "org:member"
        );
    const teachers =
        memberships.data.filter(
            (membership) =>
                membership.role ===
                "org:admin"
        );

    const assignmentsData =
        await db.query.assignments.findMany({
            where: eq(
                assignments.orgId,
                orgId
            ),
        });

    const assignmentCount =
        assignmentsData.length;

    return (
        <div className="h-full w-full p-3 flex flex-col gap-2">
            <h1 className="text-2xl text-primary font-semibold">Hey teacher!</h1>
            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl p-3 flex items-center gap-x-3 bg-chart-1 border border-primary">
                    <Users height={30} width={30} className="text-primary" />
                    <div>
                        <h2 className="text-lg font-medium text-primary">
                            {students.length} {students.length === 1 ? "student" : "students"}
                        </h2>
                        <h3 className="text-xs font-mono">
                            {students.length} {students.length === 1 ? "student" : "students"} in your class.
                        </h3>
                    </div>
                </div>
                <div className="rounded-xl p-3 flex items-center gap-x-3 bg-chart-1 border border-primary">
                    <UserStar height={30} width={30} className="text-primary" />
                    <div>
                        <h2 className="text-lg font-medium text-primary">
                            {teachers.length} {teachers.length === 1 ? "teacher" : "teachers"}
                        </h2>
                        <h3 className="text-xs font-mono">
                            {teachers.length} {teachers.length === 1 ? "teacher" : "teachers"} in your class.
                        </h3>
                    </div>
                </div>
                <div className="rounded-xl p-3 flex items-center gap-x-3 bg-chart-1 border border-primary">
                    <NotebookPen height={30} width={30} className="text-primary" />
                    <div>
                        <h2 className="text-lg font-medium text-primary">
                            {assignmentCount} {assignmentCount === 1 ? "assignment" : "assignments"}
                        </h2>
                        <h3 className="text-xs font-mono">
                            Total of {assignmentCount} {assignmentCount === 1 ? "assignment" : "assignments"} in your class.
                        </h3>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
                <Image
                    src={"/books-dark.svg"}
                    alt="books"
                    height={300}
                    width={300}
                />
                <a
                    href={`/dashboard/assignments`}
                >
                    <Button
                        className="w-full text-lg font-mono"
                    >
                        See assignments
                    </Button>
                </a>
            </div>
        </div>
    )
}