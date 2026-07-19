import { OrganizationSwitcher, } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {

    const { orgId } = await auth();

    if (orgId) {
        redirect("/dashboard");
    }

    return (
        <div className="h-full p-6 flex items-center justify-center">
            <div className="w-full max-w-[70%] space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-brand-900 flex gap-x-3 items-baseline justify-center">
                        <span>Welcome to StudyStack</span>
                        <img src="/books-dark.svg" alt="" className="h-10 w-10 object-contain" />
                    </h1>

                    <p className="text-brand-700">
                        Teachers create classrooms and invite students.
                        Students join through invitations.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 items-start">
                    <div className="rounded-2xl border border-brand-800 bg-brand-200/40 p-6 h-[30vh]">
                        <h2 className="text-2xl font-semibold text-brand-900">
                            Teacher?
                        </h2>

                        <p className="text-brand-700">
                            Create a classroom and start inviting students.
                        </p>

                        <div className="mt-6">
                            <OrganizationSwitcher
                                hidePersonal
                                afterCreateOrganizationUrl={"/dashboard"}
                                afterSelectPersonalUrl={"/dashboard"}
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-brand-800 bg-brand-200/40 p-6 h-[30vh]">
                        <h2 className="text-2xl font-semibold text-brand-900">
                            Student
                        </h2>

                        <p className="text-brand-700">
                            Ask your teacher for an invitation email.
                        </p>

                        <div className="mt-7 rounded-xl bg-brand-100 border-brand-700 border p-4">
                            <p className="text-sm text-brand-700">
                                Once you accept the invitation,
                                you'll automatically gain access
                                to your classroom.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}