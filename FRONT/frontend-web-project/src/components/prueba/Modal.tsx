import { ReactNode, useEffect, useRef } from "react";
import { UseModalContext } from "../../context/modal.context";
import { createPortal } from "react-dom";
import "./Modal.css"

interface Props {
    children: ReactNode
}

export const Modal = ({ children }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const modalRoot = document.getElementById('modal');
    const { state, setState } = UseModalContext();

    const clouseModal = () => { setState(false) }

    const handlerContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setState(false);
            }
        }

        if (state) {
            document.addEventListener("keydown", handleEsc)
        }

        return () => {
            document.removeEventListener("keydown", handleEsc)
        }
    }, [state, setState])

    if (!state || !modalRoot) {
        return null;
    }

    return createPortal(
        <div className="overlay" onClick={clouseModal}>
            <div className="modal" onClick={handlerContentClick} ref={modalRef}>
                {children}
                <button className="clouse-button" onClick={clouseModal}>Cerrar</button>
            </div>
        </div>
        , modalRoot)
}


