import React, { KeyboardEvent, useRef, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const GetFormattedText = (text: string, length: number) => text?.length > length ? text.substring(0, 5) + '...' : text;

export const Challenge7 = () => {
    const [list, setList] = useState<string[]>([]);
    const [text, setText] = useState<string | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const addText = (text: string) => {
        setList(prevState => [...prevState, text]);
        if (inputRef.current) inputRef.current.value = '';
    };

    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        addText(e.currentTarget.value);
    };

    const onOpenModal = (text: string) => {
        setText(text);
        setShowModal(true);
    };
    const onCloseModal = () => setShowModal(false);

    return (
        <>
            <h4>Challenge - List of tasks</h4>
            <hr />

            <Container>
                <FormControl autoFocus onKeyDown={onInputKeyDown} ref={inputRef} />
                <br />

                {list.map(x => <ListItem key={x} text={x} onClick={onOpenModal} />)}
            </Container>

            <Modal show={showModal} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Text</Modal.Title>
                </Modal.Header>
                <Modal.Body>{text}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const ListItem = ({ text, onClick }: { text: string, onClick: (text: string) => void }) => {
    const formattedText = GetFormattedText(text, 5);
    const onTextClicked = () => onClick(text);

    return (
        <>
            <div onClick={onTextClicked}>
                {formattedText}
            </div>
        </>
    );
};

export default Challenge7;
