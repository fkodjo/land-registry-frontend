import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        userName: '',
        fullName: '',      // Pour le design (Nom complet)
        walletAddress: '',
        neighborhood: '',  // Pour le design (Quartier)
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Mapping vers le backend existant :
            // fullName -> name
            // neighborhood -> userAddress
            const payload = {
                userName: form.userName,
                password: form.password,
                walletAddress: form.walletAddress,
                name: form.fullName, 
                userAddress: form.neighborhood, 
                role: 'user'
            };

            await api.post('/users/signup', payload);
            alert("Compte créé avec succès !");
            navigate('/login');
        } catch (error) {
            alert("Erreur: " + (error.response?.data?.message || "Erreur inscription"));
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card" style={{height: 'auto', marginTop:'20px', marginBottom:'20px'}}>
                <h2 style={{color:'#6c757d'}}>Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom d'utilisateur:</label>
                        <input className="form-control" type="text" onChange={e => setForm({...form, userName: e.target.value})} required />
                    </div>
                    <div className="form-group">
                        <label>Nom complet:</label>
                        <input className="form-control" type="text" onChange={e => setForm({...form, fullName: e.target.value})} required />
                    </div>
                    <div className="form-group">
                        <label>Adresse de portefeuille Ethereum:</label>
                        <input className="form-control" type="text" onChange={e => setForm({...form, walletAddress: e.target.value})} required />
                    </div>
                    <div className="form-group">
                        <label>Adresse/Quartier:</label>
                        <input className="form-control" type="text" onChange={e => setForm({...form, neighborhood: e.target.value})} required />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe:</label>
                        <input className="form-control" type="password" onChange={e => setForm({...form, password: e.target.value})} required />
                    </div>
                    <button type="submit" className="btn-action">S'inscrire</button>
                </form>
            </div>
        </div>
    );
}