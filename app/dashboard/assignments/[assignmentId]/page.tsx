import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MoveLeft } from "lucide-react";

export default function AssignmentIdPage() {
    return (
        <div className="h-full w-full max-h-full overflow-auto flex flex-col gap-y-5">
            <div className="space-y-3">

                <a href="/dashboard/assignments">
                    <Button variant="ghost" className="p-1 hover:bg-chart-1/20">
                        <MoveLeft /> Back
                    </Button>
                </a>
                <div className="flex items-endline gap-3">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold flex gap-3 items-center">
                            Assignment 1
                            <div className="flex gap-3 h-fit">
                                <Badge>
                                    Due Jul 28
                                </Badge>

                                <Badge variant="secondary">
                                    Created Jul 20
                                </Badge>
                            </div>
                        </h1>

                        <p className="text-muted-foreground mt-2">
                            Complete the exercises of.....
                        </p>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-3 gap-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Students
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <p className="text-3xl font-bold">
                            12
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Completed
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <p className="text-3xl font-bold text-green-600">
                            8
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pending
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <p className="text-3xl font-bold text-orange-500">
                            4
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Progress
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                    <Progress value={66} />

                    <p className="text-sm text-muted-foreground">
                        5 students out of 13 completed
                    </p>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Completed
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        ...
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Pending
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        ...
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}