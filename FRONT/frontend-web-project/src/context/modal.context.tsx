import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalContext = createContext<ModalContextType>({
    state: false,
    setState: () => null
});

export const UseModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("Model is bein used outside it's Provider")
    }
    return context;
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<boolean>(false);
    return (
        <ModalContext.Provider value={{ state, setState }}>
            {children}
        </ModalContext.Provider>
    )
}