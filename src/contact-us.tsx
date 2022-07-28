import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import './contact-us.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface IFormInput {
    email?: string;
    comments?: string;
    isSomething?: boolean;
}

const schema = yup.object({
    email: yup.string().required(),
    comments: yup.number().positive().integer().required(),
    isSomething: yup.boolean().optional(),
}).required();

export const ContactUs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    });
    const id = useId();

    const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput, e?: React.BaseSyntheticEvent | undefined) => {
        // if (!e?.currentTarget.checkValidity()) {
        e?.preventDefault();
        e?.stopPropagation();
        // }
        console.log('data', data.email);
        console.log('handleSubmit', e);
        // console.log('dirtyFields', formState.dirtyFields);
        console.log('formState.isValid', errors);
    };

    // const onSubmit = handleSubmit((data: FieldValues, e?: React.BaseSyntheticEvent | undefined) => {
    //     e?.preventDefault();
    //     e?.stopPropagation();
    //     console.log('onSubmit:start');
    //     console.log('data', data);
    //     console.log('event', e);
    //     console.log('formState', formState.isSubmitted, formState.isSubmitting, formState.isSubmitSuccessful, formState.submitCount, formState.isValid);
    // });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId={`${id}-email`}>
                <Form.Label>Email address</Form.Label>
                <Form.Control {...register('email')}
                              type="email"
                              placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                <Form.Control.Feedback type="invalid">Email is required.</Form.Control.Feedback>
                <br />
                {!!errors.email && "Email is required"}
            </Form.Group>

            <Form.Group className="mb-3" controlId={`${id}-comment`}>
                <Form.Label>Enter comments</Form.Label>
                <Form.Control {...register('comments')} as="textarea" rows={3} />
            </Form.Group>
            {!!errors.comments && "Comment is required"}
            <Form.Group className="mb-3" controlId={`${id}-check`}>
                <Form.Check {...register('isSomething')} type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};
