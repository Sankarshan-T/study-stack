"use client";

import createAssignment from "@/app/actions/create-assignments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function NewAssignmentForm() {
    const router =
        useRouter();

    const [pending, startTransition] = useTransition();

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [aditionalNotes, setAditionalNotes] = useState("");

    const [dueDate, setDueDate] = useState("");

    function handleCreate() {
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
            const promise =
                createAssignment({
                    title,
                    description,
                    aditionalNotes,
                    dueDate,
                }).then(() => {
                    router.push(
                        "/dashboard/assignments"
                    );
                });

            toast.promise(
                promise,
                {
                    loading:
                        "Creating assignment...",

                    success:
                        "Created assignment successfully!",

                    error:
                        "Unable to create assignment",
                }
            );
        });
    }

    return (
        <div className="h-full w-full p-3 flex">
            <div
                className="mx-auto my-auto w-[90%] gap-6 flex flex-col bg-chart-1/20 rounded-xl border border-primary p-6"
            >
                <h1 className="text-2xl font-semibold">
                    New Assignment
                </h1>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <h2 className="text-sm font-mono">
                            Title
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </h2>

                        <Input
                            placeholder="Title..."
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-sm font-mono">
                            Due Date
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </h2>

                        <Input
                            type="date"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <h2 className="text-sm font-mono">
                            Description
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </h2>

                        <Textarea
                            placeholder="Describe the task..."
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-sm font-mono">
                            Additional Notes
                        </h2>

                        <Textarea
                            placeholder="Optional..."
                            value={aditionalNotes}
                            onChange={(e) =>
                                setAditionalNotes(
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        disabled={pending}
                        onClick={
                            handleCreate
                        }
                        className={cn(
                            "transition",
                            pending &&
                            "animate-pulse"
                        )}
                    >
                        {pending
                            ? "Creating..."
                            : "Create"}
                    </Button>
                </div>
            </div>
        </div>
    );
}