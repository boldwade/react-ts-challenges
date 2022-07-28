import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSessionStorage } from "../hooks/useStorage";

interface IFormInput {
    email?: string;
    password?: string;
}

const schema = yup.object({
    email: yup.string().required('Yup, email is required').min(6, 'Minimum length of 6, please'),
    password: yup.string().required().min(6, 'Minimum length of 6, please'),
});

export const Challenge11 = () => {
    const {
        value: users,
        setValue: setUsers,
    } = useSessionStorage<Array<IFormInput>>({ key: 'users' });

    const { handleSubmit, formState, reset, control } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    });
    const errors = formState?.errors;

    const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput, e?: React.BaseSyntheticEvent | undefined) => {
        e?.preventDefault();
        e?.stopPropagation();

        console.log('data', data.email, data.password);
        console.log('handleSubmit', e);
        console.log('errors', errors);

        if (data.email && data.password) {
            if (users?.length) {
                const foundUser = users.find(value => value.email === data.email);
                if (foundUser?.password === data.password) {
                    reset();
                    return alert(`Logged in successfully! Hi ${foundUser.email}`);
                }
                return alert('Invalid credentials. Please try again.');
            }

            setUsers(prevState => [...prevState ?? [], { email: data.email, password: data.password }]);
            reset();
            return alert(`New account created!, Welcome, ${data.email}`);
        }

        alert('Oops... something went wrong!');
    };

    const onFormReset = () => reset();

    return (
        <>
            <h4>Challenge 11 - Simple Login</h4>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)} onReset={onFormReset}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Controller control={control}
                                defaultValue=""
                                name="email"
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control onChange={onChange} value={value} ref={ref} type="email" autoFocus
                                                  isInvalid={!!errors.email}
                                                  placeholder="Enter email"
                                    />
                                )}
                    />
                    <Form.Text className="text-muted">We will never share your email.</Form.Text>
                    <Form.Control.Feedback type="invalid" className={'text-capitalize'}>
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Controller control={control}
                                defaultValue=""
                                name="password"
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control onChange={onChange} value={value} ref={ref} type="password"
                                                  isInvalid={!!errors.password}
                                                  placeholder="Enter password"
                                    />
                                )}
                    />
                    {/*<Form.Text className="text-muted">We need a valid password address.</Form.Text>*/}
                    <Form.Control.Feedback type="invalid" className={'text-capitalize'}>
                        {errors.password?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={'mt-3 d-flex justify-content-end'}>
                    <Button variant="primary" type="submit" className={'flex'}>
                        Submit
                    </Button>
                    <Button variant="secondary" type="reset" className={'flex ms-3'}>
                        Reset
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
};
export default Challenge11;
