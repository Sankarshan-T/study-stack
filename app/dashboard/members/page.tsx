import { cn } from "@/lib/utils";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function StudentsPage() {
    const { orgId } = await auth();

    if (!orgId) return null;

    const client = await clerkClient();

    const members =
        await client.organizations.getOrganizationMembershipList({
            organizationId: orgId,
        });


    return (
        <div className="p-3 h-full w-full space-y-2">
            <h1 className="text-2xl text-primary font-semibold">Members:</h1>
            <div className="grid grid-cols-4 gap-2">
                {members.data.map((member) => (
                    <div
                        key={member.id}
                        className={cn("rounded-xl p-2 flex items-center gap-x-3", member.role === 'org:admin' ? "bg-chart-2/30 border border-primary" : "bg-chart-1 border border-chart-3")}>
                        <Image
                            src={member.publicUserData?.imageUrl || ""}
                            alt={member.publicUserData?.firstName || "Student"}
                            height={30}
                            width={30}
                            className="rounded-full border-2 border-primary"
                        />
                        <div className="flex flex-col items-start space-y-0">
                            <h2 className="text-primary font-medium">{member.publicUserData?.firstName} {member.publicUserData?.lastName}</h2>
                            <p className="text-xs font-mono text-chart-4">{member.role === 'org:admin' ? "Teacher" : "Student"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}