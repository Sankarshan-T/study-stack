import { auth, clerkClient } from "@clerk/nextjs/server";
import { Users, UserStar } from "lucide-react";

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

    return (
        <div className="h-full w-full p-3 space-y-2">
            <h1 className="text-2xl text-primary font-semibold">Hey there!</h1>
            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl p-3 flex items-center gap-x-3 bg-chart-1 border border-primary">
                    <Users height={30} width={30} className="text-primary" />
                    <div>
                        <h2 className="text-lg font-medium text-primary">{students.length} students</h2>
                        <h3 className="text-xs font-mono">{students.length} students in your class.</h3>
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
            </div>
        </div>
    )
}