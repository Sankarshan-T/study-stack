"use client"

import deletAssignment from "@/app/actions/delete-assignment";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteProps {
    assignmentId: string;
}

export function DeleteAssignment({
    assignmentId,
}: DeleteProps) {
    const router = useRouter();

    async function handleDelete() {
        const promise = deletAssignment(assignmentId)
            .then(() => {
                router.push("/dashboard.assignments");
                router.refresh();
            })

        toast.promise(promise, {
            loading: "Deleting assignment...",
            success: "Assignment deleted.",
            error: "Failed to delete assignment.",
        })
    }

    return (
        <Button
            variant="destructive"
            onClick={handleDelete}
        >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
        </Button>
    )
}