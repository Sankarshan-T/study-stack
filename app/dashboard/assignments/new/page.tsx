import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { NewAssignmentForm }
    from "../_components/newAssignmentForm";

export default async function NewAssignmentPage() {
    const { orgRole } =
        await auth();

    if (orgRole !== "org:admin") {
        redirect("/dashboard");
    }

    return (
        <NewAssignmentForm />
    );
}