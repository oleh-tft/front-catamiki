import type { ReactNode } from "react";

export default interface ModalData {
    title: string,
    isCancellable?: boolean,
    onCancel?: () => void,
    children: ReactNode
}