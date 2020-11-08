import React from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';
import { Wrapper, Content, CloseIcon } from './Modal.css';

const Modal = ({ children }) => {
    const history = useHistory();

    const closeModalHandler = () => {
        history.push("/budget");
    }

    return createPortal(
        <Wrapper onClick={closeModalHandler}>
            <Content onClick={e => e.stopPropagation()}>
                <CloseIcon onClick={closeModalHandler}>&times;</CloseIcon>
                {children}
            </Content>
        </Wrapper>,
        document.getElementById('modal')
    );
}

export default Modal;