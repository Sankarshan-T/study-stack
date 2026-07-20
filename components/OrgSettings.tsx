import { Settings } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export const OrgSettings = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size={'lg'}
                    className="w-full justify-start rounded-xl px-3 py-3 text-primary hover:bg-purple-300/20"
                >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                </Button>
            </DialogTrigger>
            <DialogContent style={{ maxWidth: "none", width: "fit-content" }} className="p-0 scale-90 bg-transparent border-none animate-in">
                <OrganizationProfile routing="hash" />
            </DialogContent>
        </Dialog>
    )
}
