"use server"

import { db } from "@/db";
import { assignmentCompletions, assignments } from "@/db/schema";
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm";

export default async function deletAssignment(
    assignmnetId: string
) {
    const { orgRole, orgId } = await auth();

    if (orgRole !== "org:admin" || !orgId) throw new Error("Unauthorized");

    await db.delete(assignmentCompletions).where(
        eq(
            assignmentCompletions.assignmentId,
            assignmnetId
        )
    );

    await db.delete(assignments).where(
        and(
            eq(assignments.id, assignmnetId),
            eq(assignments.orgId, orgId),
        )
    );
}