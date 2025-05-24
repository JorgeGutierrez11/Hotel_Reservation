import { ReactNode, useEffect, useRef } from "react";
import { UseModalContext } from "../../context/modal.context";
import { createPortal } from "react-dom";
import "./Modal.css"


interface Props {
    children: ReactNode;
}

export const Modal = ({ children }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const modalRoot = document.getElementById("modal");
    const { state, setState } = UseModalContext();

    const closeModal = () => {
        setState(false);
    };

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setState(false);
            }
        };

        if (state) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [state, setState]);

    if (!state || !modalRoot) {
        return null;
    }

    return createPortal(
        <div className="overlay" onClick={closeModal}>
            <div className="modal" onClick={handleContentClick} ref={modalRef}>
                <button className="close-button" onClick={closeModal} aria-label="Cerrar modal">
                    &times; {/* Esto renderiza una X */}
                </button>
                {children}
            </div>
        </div>,
        modalRoot
    );
};