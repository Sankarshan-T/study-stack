import { OrganizationProfile } from "@clerk/nextjs"
import { Dialog, Modal, ModalOverlay } from "./application/modals/modal"

interface DialogProps {
    isOpen: boolean;
    onOpenChange: () => {};
}


export const OrganizationProfileDialog = ({
    isOpen,
    onOpenChange
}: DialogProps) => {
    return (
        <ModalOverlay
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <Modal
            >
                {/* <Dialog
                    className="
                        w-[90vw]
                        h-[85vh]
                        overflow-hidden
                        rounded-2xl
                        bg-primary
                    "
                > */}
                <OrganizationProfile
                    appearance={{
                        elements: {
                            rootBox: "h-fit",
                            card: "shadow-none border-0",
                        },
                    }}
                />
                {/* </Dialog> */}
            </Modal>
        </ModalOverlay>
    )
}