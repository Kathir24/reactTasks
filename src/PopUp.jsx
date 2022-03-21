import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from 'react-bootstrap';
const Popup = ({ ShowInputBox, handleChange, handleSubmit, state, auth }) => {
    const [show, setShow] = React.useState(false);
    console.log();

    const handleShow = () => {
        setShow(true)
        ShowInputBox();
    };
    const handleDone = () => {
        // setShow(false)
        handleSubmit();
    }
    const handleClose = () => {
        setShow(false)
    };
    const handleLoginPage =()=>{
        auth(false)
    }
    return (
        <>
            <Button variant="danger" onClick={handleShow} className='m-2'>
                Add Row
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add data to table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Control
                            className="mb-3"
                            type="number"
                            placeholder="user Id"
                            size='sm'
                            name="userId"
                            onChange={handleChange}
                            value={state.userId}
                        />
                        <p>{state.error.userId}</p>
                        <Form.Control
                            className="mb-3"
                            type="text"
                            placeholder="Body"
                            size='sm'
                            name="body"
                            onChange={handleChange}
                            value={state.body}
                        />
                        <p>{state.error.body}</p>
                        <Form.Control
                            className="mb-3"
                            type="text"
                            placeholder="Title"
                            size='sm'
                            name="title"
                            onChange={handleChange}
                            value={state.title}
                        />
                        <p>{state.error.title}</p>

                        <Button type="submit" variant="success" onClick={handleDone}>send data</Button>

                    </Form>
                </Modal.Body>
            </Modal>
            <Button variant="secondary" onClick={handleLoginPage}>Logout</Button>

        </>
    )
}

export default Popup;