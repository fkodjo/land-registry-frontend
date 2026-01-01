import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Footer() {
    const [contractAddress, setContractAddress] = useState('Chargement...');

    useEffect(() => {
        // On essaie de récupérer l'adresse depuis le backend
        api.get('/lands/contrat')
            .then(res => {
                if(res.data && res.data.address) {
                    setContractAddress(res.data.address);
                }
            })
            .catch(err => {
                // Si l'API échoue, on peut mettre une adresse par défaut ou un message
                console.error("Impossible de récupérer l'adresse du contrat");
                setContractAddress("Non disponible"); 
            });
    }, []);

    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Land Registry - Tous droits réservés.</p>
                <p className="contract-info">
                    Adresse du Smart Contract : <br/>
                    <span className="address-text">{contractAddress}</span>
                </p>
            </div>
        </footer>
    );
}