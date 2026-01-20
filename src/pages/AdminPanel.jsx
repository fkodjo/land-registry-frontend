// src/pages/AdminPanel.jsx
import { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function AdminPanel() {
    const { logout } = useContext(AuthContext);
    const [lands, setLands] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    const fetchLands = () => {
        api.get('/lands').then(res => setLands(res.data.lands)).catch(console.error);
    };

    useEffect(fetchLands, []);

    const approveLand = async (tokenId) => {
        if (!window.confirm("Valider ce titre foncier ? Cette action est irréversible (Blockchain).")) return;
        setLoadingId(tokenId);
        try {
            await api.post('/lands/approve', { tokenId });
            alert("Succès ! Titre transféré au propriétaire.");
            fetchLands();
        } catch (err) {
            alert(err.response?.data?.message || "Erreur");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="layout">
            <header className="admin-header">
                <h1>Administration</h1>
                <button onClick={logout} className="btn-danger">Déconnexion</button>
            </header>

            <div className="card full-width">
                <h3>Gestion des Titres Fonciers</h3>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Plan</th>
                            <th>ID Titre</th>
                            <th>Demandeur</th>
                            <th>Statut</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lands.map(land => (
                            <tr key={land._id}>
                                <td><a href={land.planPicture} target="_blank"><img src={land.planPicture} className="thumb" /></a></td>
                                <td>{land.uniqueIdentity}</td>
                                <td title={land.requesterIdentity}>
                                    {land.requesterIdentity ? land.requesterIdentity.substring(0, 6) + '...' : 'N/A'}
                                </td>
                                <td><span className={`status ${land.status}`}>{land.status}</span></td>
                                <td>
                                    {land.status === 'PENDING' && (
                                        <button
                                            onClick={() => approveLand(land.tokenId)}
                                            disabled={loadingId === land.tokenId}
                                            className="btn-approve"
                                        >
                                            {loadingId === land.tokenId ? "..." : "Valider"}
                                        </button>
                                    )}
                                    {land.status === 'APPROVED' && <span>✅</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}