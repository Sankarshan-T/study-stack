import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const assignments = pgTable(
    "assignments",
    {
        id: text("id")
            .$defaultFn(() =>
                crypto.randomUUID()
            )
            .primaryKey(),
        orgId: text("org_id")
            .notNull(),
        title: text("title")
            .notNull(),
        description: text("description")
            .notNull(),
        aditionalNotes: text("aditional_notes"),
        dueDate: timestamp("due_date")
            .notNull(),
        createdBy: text("created_by")
            .notNull(),
        createdAt: timestamp("created_at")
            .defaultNow()
            .notNull(),
    }
);

export const assignmentCompletions =
    pgTable(
        "assignment_completions",
        {
            id: text("id")
                .$defaultFn(() =>
                    crypto.randomUUID()
                )
                .primaryKey(),

            assignmentId:
                text(
                    "assignment_id"
                ).notNull(),

            studentId:
                text(
                    "student_id"
                ).notNull(),

            startTime:
                timestamp(
                    "start_time"
                ).notNull(),

            endTime:
                timestamp(
                    "end_time"
                ).notNull(),

            completedAt:
                timestamp(
                    "completed_at"
                )
                    .defaultNow()
                    .notNull(),
        }
    );