"use client";

import createAssignment from "@/app/actions/create-assignments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function NewAssignment() {
    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [aditionalNotes, setAditionalNotes] =
        useState("");

    const [dueDate, setDueDate] =
        useState("");

    const router = useRouter();

    const [pending,
        startTransition] =
        useTransition();

    async function handleCreate() {
        if (
            !title ||
            !description ||
            !dueDate
        ) {
            toast.error(
                "Please fill all required fields."
            );

            return;
        }
        startTransition(() => {
            const promise = createAssignment({
                title,
                description,
                aditionalNotes,
                dueDate,
            }).then(() => {
                router.push("/dashboard/assignments");
            });

            toast.promise(promise, {
                loading: "Creating assignment...",
                success: "Created assignment successfully!",
                error: "Unable to create assignment",
            });
        });
    }

    return (
        <div className="h-full w-full p-3 flex">
            <div
                className="form mx-auto my-auto w-[90%] min-h-0 gap-6 flex flex-col bg-chart-1/20 rounded-xl border border-primary p-6"
            >
                <h1 className="text-2xl text-primary font-semibold">New Assignment</h1>
                <div className="grid grid-cols-2 gap-x-4">
                    <div className="flex flex-col gap-y-1">
                        <h2 className="text-sm text-primary font-mono">
                            Title<span className="text-red-500"> *</span>
                        </h2>
                        <Input
                            required
                            placeholder="Title..."
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <h2 className="text-sm text-primary font-mono">
                            Due Date
                            <span className="text-red-500"> *</span>
                        </h2>
                        <Input
                            required
                            type="date"
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-y-1">
                        <h2 className="text-sm text-primary font-mono">
                            Description<span className="text-red-500"> *</span>
                        </h2>
                        <Textarea
                            required
                            placeholder="Describe the task..."
                            className="flex-1 resize-none overflow-y-auto wrap-break-word"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <h2 className="text-sm text-primary font-mono">
                            Aditional Notes
                        </h2>
                        <Textarea
                            placeholder="Any other points to say? (optional)"
                            className="flex-1 resize-none overflow-y-auto wrap-break-word"
                            onChange={(e) => setAditionalNotes(e.target.value)}
                        />
                    </div>
                </div>
                <div className="gap-4 flex justify-end w-full">
                    <Button
                        onClick={handleCreate}
                        disabled={pending}
                        className={cn("hover:scale-103 transition", pending && "animate-pulse")}>
                        {pending
                            ? "Creating..."
                            : "Create"}
                    </Button>
                </div>
            </div>
        </div>
    )
}