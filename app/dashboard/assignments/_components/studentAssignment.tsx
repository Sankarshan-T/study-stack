"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { completeAssignment } from "@/app/actions/complete-assignment";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StudentAssignmentProps {
    assignmentId: string;
    completion: {
        startTime: Date;
        endTime: Date;
    } | null;
}

export function StudentAssignment({
    assignmentId,
    completion,
}: StudentAssignmentProps) {
    const router =
        useRouter();

    const [startTime, setStartTime] =
        useState("");

    const [endTime, setEndTime] =
        useState("");

    const isCompleted =
        !!completion;

    async function handleComplete() {
        if (
            !startTime ||
            !endTime
        ) {
            toast.error(
                "Please fill all fields."
            );

            return;
        }

        const promise =
            completeAssignment({
                assignmentId,
                startTime:
                    new Date(startTime),

                endTime:
                    new Date(endTime),
            }).then(() => {
                router.refresh();
            });

        toast.promise(
            promise,
            {
                loading:
                    "Completing assignment...",

                success:
                    "Assignment completed!",

                error:
                    "Unable to complete assignment",
            }
        );
    }

    if (isCompleted) {
        return (
            <Card>
                <CardContent className="py-10 text-center space-y-3">
                    <Badge>
                        Completed
                    </Badge>

                    <p className="text-muted-foreground">
                        You completed this assignment.
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Started:
                        {" "}
                        {completion.startTime.toLocaleTimeString()}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Ended:
                        {" "}
                        {completion.endTime.toLocaleTimeString()}
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Complete Assignment
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>
                        Start Time
                    </Label>

                    <Input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) =>
                            setStartTime(
                                e.target.value
                            )
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label>
                        End Time
                    </Label>

                    <Input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) =>
                            setEndTime(
                                e.target.value
                            )
                        }
                    />
                </div>

                <Button
                    onClick={handleComplete}
                >
                    Mark as Completed
                </Button>
            </CardContent>
        </Card>
    );
}