import React, {useEffect} from 'react';
import FocusTrap from "focus-trap-react";
import cn from 'classnames';
/*import {CloseIcon} from '../Icons/Icons';*/
import './Modal.css';

const Modal = ({isVisible, title, onClose, children, size = "small"}) => {

    const handleClose = () => {
        onClose();
    }

    useEffect(() => {
        const onEscCloseModal = ({ key }) => {
            if (key === "Escape") {
                handleClose();
            }
        };
    
        if (isVisible) {
            document.addEventListener("keydown", onEscCloseModal);
            
            // fix the body in place at the current scroll point
            // to prevent it scrolling around while the modal's on top
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.position = "fixed";
            document.body.style.overflowY = "scroll";
        } else {
            document.removeEventListener("keydown", onEscCloseModal);

            // restore scroll position from before modal was opened
            const scrollY = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.overflowY = "";
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }
    
        return () => document.removeEventListener("keydown", onEscCloseModal);
    }, [isVisible]);

    if (!isVisible) {
		return null;
	}

	const onClickBackground = (e) => {
		// direct click on background, not the modal itself
		if ((e.target).matches(".modal__background")) {
			handleClose();
		}
	};

	return (
		<FocusTrap>
			<div className="modal__background" onClick={onClickBackground}>
				<div
					role="dialog"
					className={cn("modal__foreground", {
						"modal--sizeSmall": size === "small",
						"modal--sizeLarge": size === "large",
					})}
				>
					<div className="modal__closeBar">
                        <h1 className="modal__title">{title}</h1>
						<button onClick={handleClose} className="modal__closeButton">
							 <span className="screen-reader-text">Close</span>
						</button>
					</div>
					<div
						tabIndex={0}
						className={"modal__content"}
					>
						<div className={"modal__content__child"}>{children}</div>
					</div>
				</div>
			</div>
		</FocusTrap>
	);
};

export default Modal;