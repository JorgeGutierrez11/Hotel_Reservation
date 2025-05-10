import { ReactNode } from "react";
import { ModalProvider } from "./modal.context";

interface Props {
    children: ReactNode;
}

export const GlobalProvider = ({ children }: Props) => {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    )
}