import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isLogin } from '../utils/auth';

const BlogForm = (props) => {
    const {
        method,
        formState,
        toggle: setState,
        letter,
        createLetter
    } = props;

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [isPublic, setIsPublic] = useState(true);

    const toggle = () => {
        setState(!formState);
        setMessage("");
        setTitle("");
    }

    const create = () => {
        toggle();
        createLetter({ "title": title, "message": message, "is_public": isPublic, "is_delete": isDelete });
    }

    useEffect(() => {
        setTitle(letter?.title || "");
        setMessage(letter?.message || "");
        setIsPublic(letter?.is_public);
    }, [letter]);

    return (
        <Modal isOpen={formState} toggle={toggle} className="modal-lg">
            <ModalHeader toggle={toggle}>{method} CoverLetter</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
                    </FormGroup>
                    <FormGroup>
                        <Label for="letter">Letter Area</Label>
                        <Input type="textarea" name="letter" id="letter" rows="15" value={message} onChange={e => setMessage(e.target.value)} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                {
                    method === "Update" &&
                    (
                    <div className="mr-auto">
                        <FormGroup check className="d-inline-block">
                        <Label check>
                            <Input type="checkbox" onChange={() => {
                                setIsDelete(!isDelete);
                            }} />{' '}Delete
                        </Label>
                        </FormGroup>
                        <FormGroup check className="d-inline-block ml-3">
                        <Label check>
                            {isPublic?
                            <Input type="checkbox" onChange={() => { setIsPublic(!isPublic); }} checked/>:
                            <Input type="checkbox" onChange={() => { setIsPublic(!isPublic); }} />}
                            {' '}Public
                        </Label>
                        </FormGroup>
                    </div>
                    )
                }
                {
                    isLogin() ?
                        <Button className="btn btn-success" onClick={create}>{method}</Button> :
                        <Button className="btn btn-secondary" disabled>Diable</Button>
                }
                {' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default BlogForm