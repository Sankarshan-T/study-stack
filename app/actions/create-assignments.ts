"use server";

import { db } from "@/db";
import { assignments } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export default async function createAssignment(
    data: {
        title: string;
        description: string;
        aditionalNotes?: string;
        dueDate: string;
    }
) {
    const { userId, orgId, } = await auth();

    if (!userId || !orgId) throw new Error("Unauthorized");

    await db.insert(assignments)
        .values({
            title: data.title,
            description: data.description,
            aditionalNotes: data.aditionalNotes,
            dueDate: new Date(data.dueDate),
            orgId: orgId,
            createdBy: userId,
        });
}