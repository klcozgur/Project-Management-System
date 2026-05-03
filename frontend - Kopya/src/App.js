import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import User from './pages/User';
import Project from './pages/Project';
import Layout from "./layout/Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<User />} />
                    <Route path="projects" element={<Project />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
