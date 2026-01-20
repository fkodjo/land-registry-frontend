import React, { useState } from 'react';

export default function Home() {
    const [searchId, setSearchId] = useState('');
    const [modalError, setModalError] = useState(false);

    const handleVerify = () => {
        if (!searchId) return;
        // On simule "introuvable" pour matcher le design
        setModalError(true);
    };

    return (
        <div className="main-content">
            <div className="hero-section">
                <h2>Bienvenue sur votre partenaire de confiance pour l'authentification et la gestion foncière moderne.</h2>

                <div className="search-box">
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#5c6e7a' }}>Code de vérification foncier :</label>
                    <input
                        type="text"
                        className="search-input"
                        value={searchId}
                        onChange={e => setSearchId(e.target.value)}
                    />
                    <button className="btn-action" onClick={handleVerify}>Vérifier titre foncier</button>
                </div>

                <div style={{ marginTop: '60px' }}>
                    <h3 style={{ color: '#333' }}>A propos de notre plateforme</h3>
                    <p style={{ maxWidth: '800px', margin: '0 auto 20px auto', color: '#666', lineHeight: '1.5' }}>
                        Nous révolutionnons la gestion des titres fonciers en utilisant la puissance de la blockchain Ethereum. <br />
                        Grâce à notre plateforme, vous bénéficiez d'une sécurité renforcée, d'une transparence totale et d'une simplification sans précédent des transactions foncières.
                        Offre une solution innovante pour authentifier, transférer et sécuriser des titres de propriété de manière efficace et rapide.
                    </p>
                    <button className="btn-action btn-blue">En savoir plus</button>
                </div>
            </div>

            {/* Modale Introuvable */}
            {modalError && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ backgroundColor: '#e3f2fd', width: '500px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button className="close-btn" onClick={() => setModalError(false)}>&times;</button>
                        <h2 style={{ color: '#d9534f' }}>Titre foncier introuvable</h2>
                    </div>
                </div>
            )}
        </div>
    );
}