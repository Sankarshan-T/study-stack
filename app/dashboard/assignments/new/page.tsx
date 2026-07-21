import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewAssignment() {
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
                        <Input required placeholder="Title..." />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <h2 className="text-sm text-primary font-mono">
                            Due Date
                            <span className="text-red-500"> *</span>
                        </h2>
                        <Input required type="date" />
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
                        />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <h2 className="text-sm text-primary font-mono">
                            Aditional Notes
                        </h2>
                        <Textarea
                            placeholder="Any other points to say? (optional)"
                            className="flex-1 resize-none overflow-y-auto wrap-break-word"
                        />
                    </div>
                </div>
                <div className="gap-4 flex justify-end w-full">
                    <Button className="hover:scale-103 transition">
                        Create
                    </Button>
                </div>
            </div>
        </div>
    )
}