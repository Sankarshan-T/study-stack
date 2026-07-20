import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AssignmensPage() {
    return (
        <div className="h-full w-full p-3">
            <h1 className="text-2xl text-primary font-semibold">Assignments:</h1>
            <Button asChild>
                <Link href="/dashboard/assignments/new">
                    Create Assignment
                </Link>
            </Button>
        </div>
    )
}