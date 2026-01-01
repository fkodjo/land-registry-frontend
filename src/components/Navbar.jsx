import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/dashboard" className="nav-link">Les titres Foncier</Link>
        <Link to="/depot" className="nav-link">Dépôt</Link>
        <Link to="/verification" className="nav-link">Vérification</Link>

        <div className="nav-right">
            {user ? (
                <span onClick={handleLogout}>Se déconnecter</span>
            ) : (
                <>
                    <Link to="/login">Se connecter</Link>
                    <Link to="/register">S'inscrire</Link>
                </>
            )}
        </div>
    </nav>
  );
}