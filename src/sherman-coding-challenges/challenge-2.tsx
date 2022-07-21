import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Image } from "react-bootstrap";

export const Challenge2 = () => {
    const url = 'https://robohash.org/';

    const [robotNames, setRobotNames] = useState<string[]>([]);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const robotInputRef = useRef<HTMLInputElement>(null);

    const onAddRobot = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!robotInputRef.current?.value || (robotNames.indexOf(robotInputRef.current?.value) > -1)) return;

        setRobotNames(prevState => [...prevState, robotInputRef.current?.value as string]);
        robotInputRef.current.value = '';
    };

    const onRobotNameChange = (e: ChangeEvent<any>) => setIsSubmitDisabled(!e?.currentTarget.value);

    const renderRobotImage = (name: string) => <Image key={name} src={url + name} />;

    return (
        <>
            <div>Robot List</div>
            <Form onSubmit={onAddRobot}>
                <InputGroup className="mb-3">
                    <Form.Control
                        aria-describedby="basic-addon2"
                        name={'robot'}
                        placeholder="Enter Robot Name"
                        ref={robotInputRef}
                        onChange={onRobotNameChange}
                        autoFocus
                    />
                    <Button variant="outline-secondary"
                            id="button-addon2"
                            name='robot'
                            type='submit'
                            disabled={isSubmitDisabled}
                    >
                        Add Robot
                    </Button>
                </InputGroup>
            </Form>
            <div>
                {robotNames.map(renderRobotImage)}
            </div>
        </>
    );
};


