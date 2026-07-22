"use server";

import { db } from "@/db";
import { assignmentCompletions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function completeAssignment(
    data: {
        assignmentId: string;
        startTime: Date;
        endTime: Date;
    }
) {
    const { userId } =
        await auth();

    await db.insert(
        assignmentCompletions
    ).values({
        assignmentId:
            data.assignmentId,

        studentId:
            userId!,

        startTime:
            data.startTime,

        endTime:
            data.endTime,
    });

    revalidatePath(
        `/dashboard/assignments/${data.assignmentId}`
    );
}