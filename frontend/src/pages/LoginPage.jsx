import React, { useState } from "react";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";


export default function LoginPage ({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[role,setRole] = useState("Admin");

    function handleLogin(e) {
        e.preventDefault();

        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headars:{"Content-Type":"application/json"},
            body: JSON.stringify({username,password,role})
        })
            .then(res => res.json())
            .then(user => {
                if (user && user.role){
                    onLogin(user);
                }else {
                    alert("Error Login");
                }
            });
    }
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "400px" }} className="p-4">
                <h3 className="text-center mb-4">Login</h3>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="Admin">Admin Login</option>
                            <option value="Employee">Employee Login</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
            </Card>
        </Container>

    );
}