"use client";

import createAssignment from "@/app/actions/create-assignments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function NewAssignmentForm() {
    const router =
        useRouter();

    const LevelsDropdown = () => {
        const levels = [
            { title: "Easy" },
            { title: "Intermediate" },
            { title: "Advanced" },
        ]

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full flex-1">
                        {level == '' ? "Level" : level}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {levels.map((levelItem) => (
                        <DropdownMenuItem
                            key={levelItem.title}
                            onClick={() => setLevel(levelItem.title)}
                        >
                            {levelItem.title}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu >
        )
    }

    const SubjectsDropdown = () => {
        const subjects = [
            { title: "English" },
            { title: "Math" },
            { title: "Science" },
            { title: "Social Studies" },
            { title: "Hindi" },
            { title: "Religious Studies" },
        ]

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full flex-1">
                        {subject == '' ? "Subject" : subject}

                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {subjects.map((subjectItem) => (
                        <DropdownMenuItem
                            key={subjectItem.title}
                            onClick={() => setSubject(subjectItem.title)}
                        >
                            {subjectItem.title}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu >
        )
    }

    const [pending, startTransition] = useTransition();
    const [level, setLevel] = useState("");
    const [subject, setSubject] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [aditionalNotes, setAditionalNotes] = useState("");
    const [dueDate, setDueDate] = useState("");
    const titleTemplate = [subject, level, title]
        .filter(value => value !== "" && value != null)
        .join(" - ");

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
                    title: titleTemplate,
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
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-mono">
                            Subject
                        </h2>
                        <div className="flex items-center gap-3">
                            <SubjectsDropdown />
                            <X
                                type="button"
                                className="h-7 w-7 border border-primary hover:bg-primary/30 text-primary transition cursor-pointer rounded"
                                onClick={() => setSubject("")}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-mono">
                            Level
                        </h2>

                        <div className="flex items-center gap-3">
                            <LevelsDropdown />
                            <X
                                type="button"
                                className="h-7 w-7 border border-primary hover:bg-primary/30 text-primary transition cursor-pointer rounded"
                                onClick={() => setLevel("")}
                            />
                        </div>
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
                            className="resize-none"
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
                            className="resize-none"
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