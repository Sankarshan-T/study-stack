import { OrganizationProfile } from "@clerk/nextjs";

export default function SettingsPage() {
    return (
        <OrganizationProfile
            appearance={{
                elements: {
                    rootBox: "w-[80%] h-[80%]",
                    card: "shadow-none border border-brand-800",
                },
            }}
        />
    );
}