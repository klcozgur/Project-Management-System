import {useEffect, useState} from "react";
import {Button, Alert, Col, Container, Form, Pagination, Row, Table, Modal} from "react-bootstrap";
import * as users from "react-bootstrap/ElementChildren";

export default function Project() {

    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageItems, setPageItems] = useState([]);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [ProjectUser, setProjectUser] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedProject, setSelectedProject] = useState({
        name: '',
        projectId: '',
        userId:'',
        status: ''
    });

    useEffect(() => {
        loadProjects();
    }, [currentPage]);

        function loadProjects() {
            fetch(`http://localhost:8080/api/projects?page=${currentPage - 1}`)
                .then(res => res.json())
                .then(result =>{

                    setProjects(result.content);
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


        function handleInputChange(e) {
            const {name, value} = e.target;
            setSelectedProject({...selectedProject, [name]: value});
        }
    function clearForm() {
        setSelectedProject({
            name: '',
            projectId: '',
            userId:'',
            status: ''

        });
    }
    function isNotClear(){
        return (
            selectedProject.name !== '' ||
            selectedProject.projectId !== '' ||
            selectedProject.userId !== '' ||
            selectedProject.status !== ''
        );
    }
    function saveProjectOnly() {
        const data = {
            name: selectedProject.name,
            status: selectedProject.status
        }

        fetch(`http://localhost:8080/api/projects`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(() => {
                clearForm();        // formu temizler
                setCurrentPage(1);  // ilk sayfaya döner
                loadProjects();     // projeleri yeniden getirir
            });
    }
    function deleteProject() {
        fetch(`http://localhost:8080/api/projects/${selectedProject.id}`, {
            method: 'DELETE'
        })
            .then(() => {
                loadProjects();     // Güncel listeyi tekrar getir
                clearForm();        // Formu temizle
            });
    }
    function updateProjectStatus() {
        fetch(`http://localhost:8080/api/projects/${selectedProject.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedProject)
        })
            .then(res => res.json())
            .then(() => {
                loadProjects();   // Listeyi güncelle
                clearForm();      // Formu temizle
            });
    }
    function addEmployeeToProject() {
        fetch(`http://localhost:8080/api/projects/${selectedProject.id}/employees/${selectedProject.userId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json())
            .then(() => {
            loadProjects();
            clearForm();
            });
    }
    function deleteEmployeeFromProject() {

        fetch(`http://localhost:8080/api/projects/${selectedProject.id}/employees/${selectedProject.userId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json())
            .then(() => {
                loadProjects();
                clearForm();
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
                            <option value="All">All Projects</option>
                            <option value="New">New</option>
                            <option value="In_Progress">In_Progress</option>
                            <option value="Completed">Completed</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Status</th>
                                <th>Project ID</th>
                                <th>User ID</th>
                            </tr>
                            </thead>
                            <tbody>
                            {projects
                                .filter(p => statusFilter === 'All' || p.status === statusFilter)
                                .map((p) => (
                                <tr key={p.id} onClick={() => {setSelectedProject(p)}}>
                                    <td>{p.name}</td>
                                    <td>{p.status}</td>
                                    <td>{p.id}</td>
                                    <td>
                                        {p.employees && p.employees.map(e => e.id).join(', ')}
                                    </td>


                                </tr>
                            ))}
                            </tbody>

                        </Table>
                        <Pagination> {pageItems}</Pagination>
                    </Col>
                    <Col sm={4}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label> Project Name</Form.Label>
                            <Form.Control
                                type='text'
                                autoComplete='off'
                                placeholder='Project Name'
                                name='name'
                                maxLength={'30'}
                                value={selectedProject.name}
                                onChange={(e)=>handleInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="status">
                            <Form.Label>Status</Form.Label>


                            <Form.Select
                                aria-label = "Assign Authority..."
                                value = {selectedProject.status}
                                name='status'
                                onChange={(e)=>handleInputChange(e)}
                            >
                                <option value=" ">Assign Project Status</option>
                                <option value = 'New'>New </option>
                                <option value = 'In_Progress'>In_Progress</option>
                                <option value = 'Completed'>Completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant ="primary" disabled={!isNotClear()} type="button" onClick={selectedProject.id ? updateProjectStatus : saveProjectOnly}>

                            {selectedProject.id  ? ('Update'): ('Create')}

                        </Button>
                        {''}
                        {isNotClear() ? (
                            <>
                                <Button variant ="outline-primary" type="button" onClick={clearForm}>
                                    Clear
                                </Button>{''}
                                {selectedProject.id ? (
                                    <Button variant ="danger" type="button" onClick={deleteProject}>
                                        Delete
                                    </Button>):('')}

                            </>
                        ):('')}
                        <Form.Group className="mb-3" controlId="projectID">
                            <Form.Label>Project ID</Form.Label>
                            <Form.Control
                                type='text'
                                autoComplete='off'
                                placeholder='Project ID'
                                name='id'
                                maxLength={'11'}
                                value={selectedProject.id}
                                onChange={(e)=>handleInputChange(e)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="userid">
                            <Form.Label> User ID</Form.Label>
                            <Form.Control
                                type='text'
                                autoComplete='off'
                                placeholder='User ID'
                                name='userId'
                                maxLength={'30'}
                                value={selectedProject.userId}
                                onChange={(e)=>handleInputChange(e)}
                            />
                        </Form.Group>
                        <Button variant ="primary" disabled={!isNotClear()} type="button" onClick={addEmployeeToProject} >

                            {selectedProject.id  ? ('Assign'): ('Update')}

                        </Button>
                        {''}
                        {isNotClear() ? (
                            <>
                                <Button variant ="outline-primary" type="button" onClick={clearForm}>
                                    Clear
                                </Button>{''}
                                {selectedProject.id ? (
                                    <Button variant ="danger" type="button" onClick={deleteEmployeeFromProject}>
                                        Delete
                                    </Button>):('')}

                            </>
                        ):('')}





                    </Col>
                </Row>


            </Container>
        </>
    }
