import {Alert, Button, Col, Container, Form, Modal, Pagination, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function User() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
        identityNo: '',
        name: '',
        surname: '',
        role: '',
        position: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageItems, setPageItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        loadUsers();
    }, [currentPage]);

    function loadUsers() {
        fetch(`http://localhost:8080/api/users?page=${currentPage - 1}`)
            .then(res => res.json())
            .then(result => {
                setUsers(result.content || result);
                let items = [];
                for (let index = 1; index <= (result.totalPages || 1); index++) {
                    items.push(
                        <Pagination.Item key={index} active={currentPage === index} onClick={() => setCurrentPage(index)}>
                            {index}
                        </Pagination.Item>
                    );
                }
                setPageItems(items);
            });
    }

    function clearForm() {
        setSelectedUser({
            identityNo: '',
            name: '',
            surname: '',
            role: '',
            position: ''
        });
    }

    function isNotClear() {
        return Object.values(selectedUser).some(v => v !== '');
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    }

    function saveUser() {
        fetch(`http://localhost:8080/api/users`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedUser)
        })
            .then(res => res.json())
            .then(result => {
                if (result.errorMessage) {
                    clearForm();
                    setErrorMessage(result.errorMessage);
                } else {
                    loadUsers();
                    clearForm();
                    setErrorMessage(null);
                }
            });
    }

    function deleteUser() {
        fetch(`http://localhost:8080/api/users/${selectedUser.id}/full-delete`, {
            method: 'DELETE'
        }).then(() => {
            loadUsers();
            clearForm();
            setShow(false);
        });
    }

    return (
        <Container>
            <Row className="mb-3">
                <Col className="text-end">
                    <Form.Select
                        style={{ width: '200px', display: 'inline-block' }}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Roles</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Identity No</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Role</th>
                            <th>Position</th>
                            <th>User ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users
                            .filter(u => statusFilter === 'All' || u.role === statusFilter)
                            .map(user => (
                                <tr key={user.id} onClick={() => setSelectedUser(user)}>
                                    <td>{user.identityNo}</td>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.role}</td>
                                    <td>{user.position}</td>
                                    <td>{user.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>{pageItems}</Pagination>
                </Col>
                <Col sm={4}>
                    <Form>
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Identity No</Form.Label>
                            <Form.Control
                                type="text"
                                name="identityNo"
                                value={selectedUser.identityNo}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={selectedUser.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                name="surname"
                                value={selectedUser.surname}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                name="position"
                                value={selectedUser.position}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select name="role" value={selectedUser.role} onChange={handleInputChange}>
                                <option value="">Assign Authority...</option>
                                <option value="EMPLOYEE">Employee</option>
                                <option value="ADMIN">ADMIN</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" disabled={!isNotClear()} onClick={saveUser}>
                            {selectedUser.id ? 'Update' : 'Create'}
                        </Button>{' '}
                        {isNotClear() && (
                            <>
                                <Button variant="outline-primary" onClick={clearForm}>Clear</Button>{' '}
                                {selectedUser.id && (
                                    <Button variant="danger" onClick={() => setShow(true)}>Delete</Button>
                                )}
                            </>
                        )}
                    </Form>
                </Col>
            </Row>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="danger" onClick={deleteUser}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
