import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isLogin } from '../utils/auth';

const BlogForm = (props) => {
  const {
    method,
    formState,
    toggle:setState,
    letter,
    createLetter
  } = props;

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const toggle = () => setState(!formState);

  const create = () => {
    toggle();
    createLetter({"title":title, "message":message});
  }

  useEffect(() => {
    setTitle(letter?.title || "");
    setMessage(letter?.message || "");
  }, [letter]);

  return (
    <Modal isOpen={formState} toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle}>{method} CoverLetter</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="letter">Letter Area</Label>
                    <Input type="textarea" name="letter" id="letter" rows="15" value={message} onChange={e => setMessage(e.target.value)}/>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            {
                isLogin() ?
                <Button className="btn btn-success" onClick={create}>{method}</Button>:
                <Button className="btn btn-secondary" disabled>Diable</Button>
            }
            {' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
  );
}

export default BlogForm