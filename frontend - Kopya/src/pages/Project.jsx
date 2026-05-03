import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap";

export default function Project() {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageItems, setPageItems] = useState([]);
    const [selectedProject, setSelectedProject] = useState({
        name: '',
        projectId: '',
        userId: '',
        status: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8080/api/projects?page=${currentPage - 1}`)
            .then(res => res.json())
            .then(result => {
                setProjects(result.content || result);
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
    }, [currentPage]);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setSelectedProject({ ...selectedProject, [name]: value });
    }

    function clearForm() {
        setSelectedProject({
            name: '',
            projectId: '',
            userId: '',
            status: ''
        });
    }

    function isNotClear() {
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
        };

        fetch(`http://localhost:8080/api/projects`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(() => {
                clearForm();
                setCurrentPage(1);
            });
    }

    function updateProjectStatus() {
        fetch(`http://localhost:8080/api/projects/${selectedProject.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedProject)
        }).then(res => res.json())
            .then(() => {
                clearForm();
                setCurrentPage(1);
            });
    }

    function deleteProject() {
        fetch(`http://localhost:8080/api/projects/${selectedProject.id}`, {
            method: 'DELETE'
        }).then(() => {
            clearForm();
            setCurrentPage(1);
        });
    }

    function addEmployeeToProject() {
        fetch(`http://localhost:8080/api/projects/${selectedProject.id}/employees/${selectedProject.userId}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            clearForm();
        });
    }

    function deleteEmployeeFromProject() {
        fetch(`http://localhost:8080/api/projects/${selectedProject.id}/employees/${selectedProject.userId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            clearForm();
        });
    }

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h3>Project List</h3>
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
                        {projects.map((p) => (
                            <tr key={p.id} onClick={() => setSelectedProject(p)}>
                                <td>{p.name}</td>
                                <td>{p.status}</td>
                                <td>{p.id}</td>
                                <td>{p.employees?.map(e => e.id).join(', ')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>{pageItems}</Pagination>
                </Col>

                <Col sm={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={selectedProject.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select name="status" value={selectedProject.status} onChange={handleInputChange}>
                            <option value="">Select status</option>
                            <option value="New">New</option>
                            <option value="In_Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </Form.Select>
                    </Form.Group>

                    <Button onClick={selectedProject.id ? updateProjectStatus : saveProjectOnly}>
                        {selectedProject.id ? 'Update' : 'Create'}
                    </Button>{' '}

                    {selectedProject.id && (
                        <Button variant="danger" onClick={deleteProject}>
                            Delete
                        </Button>
                    )}

                    <hr />

                    <Form.Group className="mb-3">
                        <Form.Label>Employee ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="userId"
                            value={selectedProject.userId}
                            onChange={handleInputChange}
                        />
                        <Form.Label>Project ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="projectId"
                            value={selectedProject.id}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="success" onClick={addEmployeeToProject}>
                        Assign to Employee
                    </Button>{' '}

                    <Button variant="outline-danger" onClick={deleteEmployeeFromProject}>
                        Remove from Employee
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
