import { StudentDashboard } from "@/app/dashboard/_components/student-dashboard";
import TeacherDashboard from "@/app/dashboard/_components/teacher-dashboard";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
    const { orgId, orgRole } = await auth();

    if (!orgId) {
        return (
            <div>
                <h1>No classroom selected</h1>
                <p>Create or select an organization first.</p>
            </div>
        );
    }

    if (orgRole === "org:admin") {
        return <TeacherDashboard />;
    }
    else
        return <StudentDashboard />;
}
