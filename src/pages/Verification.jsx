import React, { useState } from 'react';

export default function Verification() {
    const [searchId, setSearchId] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSearch = () => {
        setShowError(true);
    };

    return (
        <div className="main-content">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Entrez identifiant terrain"
                    style={{ padding: '10px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    value={searchId}
                    onChange={e => setSearchId(e.target.value)}
                />
                <button className="btn-action" style={{ width: 'auto' }} onClick={handleSearch}>Recherche</button>
            </div>

            <div style={{ border: '1px solid #333', height: '400px', position: 'relative', background: 'white' }}>
                <div style={{ borderBottom: '1px solid #333', height: '40px' }}></div>

                {showError && (
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        background: 'white', padding: '60px 40px', boxShadow: '0 0 15px rgba(0,0,0,0.2)', width: '60%', textAlign: 'center'
                    }}>
                        <button style={{ position: 'absolute', top: 10, right: 15, border: 'none', background: 'none', fontSize: 24, cursor: 'pointer' }} onClick={() => setShowError(false)}>&times;</button>
                        <h2 style={{ color: '#d9534f', fontSize: '24px' }}>Titre foncier introuvable</h2>
                    </div>
                )}
            </div>
        </div>
    );
}