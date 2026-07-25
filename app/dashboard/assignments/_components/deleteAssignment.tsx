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
                router.push("/dashboard/assignments");
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
            onClick={handleDelete}
            size={"sm"}
            className="p-1 bg-red-800/10 hover:bg-red-800 text-red-800 border border-red-800 hover:text-white"
        >
            <Trash2 className="h-4 w-4" />
            Delete
        </Button>
    )
}