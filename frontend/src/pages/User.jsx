import {Alert, Button, Col, Container, Form, Modal, Pagination, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function User() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
        identityNo:'',
        name:'',
        surname:'',
        role:'',
        position:''

    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageItems, setPageItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [statusFilter, setStatusFilter] = useState("All");
    const handleClose = () => setShow(false);

    useEffect(() => {
        loadUsers();
    },[currentPage]);

    function loadUsers() {
        fetch(`http://localhost:8080/api/users?page=${currentPage - 1}`)
            .then(res => res.json())
            .then(result =>{

                setUsers(result.content);
                let items = [];
                for (let index = 1; index <= result.totalPages + 1; index++) {
                    items.push(
                        <Pagination.Item key={index} active ={currentPage === index} onClick={()=>setCurrentPage(index)}    >
                               {index}
                        </Pagination.Item>
                    );
                    setPageItems(items);

                }
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
     function isNotClear(){
         return (
             selectedUser.identityNo !== '' ||
             selectedUser.name !== '' ||
             selectedUser.surname !== '' ||
             selectedUser.role !== '' ||
             selectedUser.position !== ''
         );
     }

    function handleInputChange(e){
        const {name,value} = e.target;
        setSelectedUser({...selectedUser,[name]:value});
    }

    function saveUser(){
        fetch(`http://localhost:8080/api/users`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            mode:'cors',
            body:JSON.stringify(selectedUser)
        } ).then((res)=>res.json())
        .then(result =>{
            if(result.errorMessage) {
                clearForm();
                setErrorMessage(result.errorMessage);
            }
                else {
                    loadUsers();
                    clearForm();
                    setErrorMessage(null);
                }
            });


    }
    function deleteUser(){
        fetch(`http://localhost:8080/api/users/${selectedUser.id}/full-delete`,{
            method:'DELETE'

        } ).then(()=>{
            loadUsers();
            clearForm();
            handleClose();
        });

    }

    return <>
        <Container>
            <Row className="mb-3">
                <Col>
                </Col>
                <Col className="text-end">
                    <Form.Select
                        style={{ width: '200px', display: 'inline-block' }}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Employee">Employee</option>
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
                            .filter(p => statusFilter === 'All' || p.role === statusFilter)
                            .map(user => (
                            <tr key={user.id} onClick={() => {setSelectedUser(user)}}>
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
                    <Pagination> {pageItems}</Pagination>
                </Col>
                <Col sm={4}>
                    <Form>
                        {errorMessage ? (
                            <Alert key = 'danger' variant = 'danger'>
                                {errorMessage}
                            </Alert>
                        ):('')}
                        <Form.Group className="mb-3" controlId="identityNo">
                            <Form.Label>Identity No</Form.Label>
                            <Form.Control
                                type='text'
                                autoComplete='off'
                                placeholder='Identity No'
                                name='identityNo'
                                maxLength={'11'}
                                value={selectedUser.identityNo}
                                onChange={(e)=>handleInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                autoComplete='off'
                                placeholder='Name'
                                name='name'
                                maxLength={'30'}
                                value={selectedUser.name}
                                onChange={(e)=>handleInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="surname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type='text'
                                autoComplete='off'
                                placeholder='surname'
                                name='surname'
                                maxLength={'30'}
                                value={selectedUser.surname}
                                onChange={(e)=>handleInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="position">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type='text'
                                autoComplete='off'
                                placeholder='Position'
                                name='position'
                                maxLength={'30'}
                                value={selectedUser.position}
                                onChange={(e)=>handleInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="role">
                            <Form.Label>Role</Form.Label>


                            <Form.Select
                                aria-label = "Assign Authority..."
                                value = {selectedUser.role}
                                name='role'
                                onChange={(e)=>handleInputChange(e)}
                            >
                                <option value="">Assign Authority...</option>
                                <option value = 'Employee'>Employee </option>
                                <option value = 'Admin'>Admin</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant ="primary" disabled={!isNotClear()} type="button" onClick={saveUser}>

                            {selectedUser.id ? ('Update'): ('Create')}

                        </Button>
                        {''}


                        {isNotClear() ? (
                            <>
                                <Button variant ="outline-primary" type="button" onClick={clearForm}>
                                    Clear
                                </Button>{''}
                                {selectedUser.id ? (
                                    <Button variant ="danger" type="button" onClick={handleShow}>
                                        Delete
                                    </Button>):('')}

                            </>

                        ):('')}

                    </Form>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant = 'danger' onClick={deleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>


            </Modal>
        </Container>
    </>
}