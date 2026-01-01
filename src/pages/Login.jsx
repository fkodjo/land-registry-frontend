import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [form, setForm] = useState({ userName: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/users/login', form);
            login(res.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert("Erreur: " + (error.response?.data?.message || "Erreur connexion"));
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom d'utilisateur:</label>
                        <input className="form-control" type="text" onChange={e => setForm({...form, userName: e.target.value})} required />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe:</label>
                        <input className="form-control" type="password" onChange={e => setForm({...form, password: e.target.value})} required />
                    </div>
                    <button type="submit" className="btn-action">Se connecter</button>
                </form>
                <Link to="/register" className="auth-link">S'inscrire</Link>
            </div>
        </div>
    );
}