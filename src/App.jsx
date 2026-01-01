// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Depot from './pages/Depot';
import Verification from './pages/Verification';

const PrivateRoute = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
    if (loading) return <div>Chargement...</div>;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                {/* Utilisation de la classe CSS .app-container définie plus haut */}
                <div className="app-container">
                    
                    <Navbar />
                    
                    {/* Ce div avec .content-wrapper va pousser le footer en bas */}
                    <div className="content-wrapper">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            <Route path="/dashboard" element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/depot" element={
                                <PrivateRoute>
                                    <Depot />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/verification" element={<Verification />} />
                            
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>

                    <Footer /> 

                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;