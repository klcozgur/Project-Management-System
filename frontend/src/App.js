import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";

import User from './pages/User';
import Project from './pages/Project';
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";

function App() {
    const [user, setUser] = useState(null);

    // Eğer login yapılmamışsa Login ekranı göster
    if (!user) {
        return <LoginPage onLogin={setUser} />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Admin yetkilisi ise Proje ve User görebilsin */}
                    {user.role === "Admin" && (
                        <>
                            <Route index element={<User />} />
                            <Route path="Projects" element={<Project />} />
                        </>
                    )}

                    {/* Employee giriş yaptıysa basit karşılama yap */}
                    {user.role === "Employee" && (
                        <Route index element={<div className="p-4">Welcome Employee: {user.username}</div>} />
                    )}

                    {/* Eşleşmeyen route varsa ana sayfaya yönlendir */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
