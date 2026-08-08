"use client"

import deletAssignment from "@/app/actions/delete-assignment";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger, DialogContent } from "@/components/ui/dialog";
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
            })

        toast.promise(promise, {
            loading: "Deleting assignment...",
            success: "Assignment deleted.",
            error: "Failed to delete assignment.",
        })
    }

    return (
        <Dialog>
            <DialogTrigger className="p-1 bg-red-800/10 hover:bg-red-800 text-red-800 border border-red-800 hover:text-primary-foreground rounded-lg text-sm flex font-normal items-center gap-2" type="button">
                <Trash2 className="h-4 w-4" />
                Delete
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure?
                    </DialogTitle>
                    <DialogDescription>
                        This action will delete the assignment permanently.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button
                            size={"sm"}
                            variant={"outline"}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose>
                        <Button
                            size={"sm"}
                            onClick={handleDelete}
                            className="p-1 bg-red-800/10 hover:bg-red-800 text-red-800 border border-red-800 hover:text-primary-foreground"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}