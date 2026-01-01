import React, { useState } from 'react';
import api from '../utils/api';

export default function Depot() {
    // Tous les champs requis par votre modèle Land.js sont ici
    const [form, setForm] = useState({ 
        uniqueIdentity: '', 
        surfaceArea: '', 
        locAddress: '', 
        geolocalization: '', 
        description: '' 
    });
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('planFile', file);
        
        // Données saisies par l'utilisateur
        data.append('uniqueIdentity', form.uniqueIdentity);
        data.append('surfaceArea', form.surfaceArea);
        data.append('locAddress', form.locAddress);
        data.append('geolocalization', form.geolocalization);
        data.append('description', form.description);

        try {
            await api.post('/lands/request', data);
            alert("Demande soumise avec succès !");
            window.location.href = "/dashboard";
        } catch (error) {
            console.error(error);
            alert("Erreur : " + (error.response?.data?.error || "Erreur lors du dépôt"));
        }
    };

    return (
        <div className="main-content">
            <div style={{maxWidth: '600px', margin: '0 auto'}}>
                <h2 style={{color: '#6c757d', marginBottom: '30px', textAlign:'center'}}>Demande d'authentification foncière</h2>
                <form className="depot-form" onSubmit={handleSubmit}>
                    
                    {/* CHAMP AJOUTÉ : Requis par la BDD */}
                    <div className="form-group">
                        <label>Numéro de Titre Foncier (ID Unique) :</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="ex: TF-2024-XXXX"
                            onChange={e => setForm({...form, uniqueIdentity: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Plan topographique du terrain (Image):</label>
                        <div className="file-input-wrapper">
                            <input type="file" onChange={e => setFile(e.target.files[0])} required />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Adresse/Quartier :</label>
                        <input className="form-control" type="text" onChange={e => setForm({...form, locAddress: e.target.value})} required />
                    </div>

                    {/* CHAMP AJOUTÉ : Requis par la BDD */}
                    <div className="form-group">
                        <label>Superficie (m²) :</label>
                        <input 
                            className="form-control" 
                            type="number" 
                            placeholder="ex: 600"
                            onChange={e => setForm({...form, surfaceArea: e.target.value})} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Localisation (GPS) :</label>
                        <input className="form-control" type="text" onChange={e => setForm({...form, geolocalization: e.target.value})} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Description :</label>
                        <textarea className="form-control" rows="4" placeholder="Description du terrain..." onChange={e => setForm({...form, description: e.target.value})}></textarea>
                    </div>
                    
                    <button type="submit" className="btn-action" style={{width:'100%', marginTop:'20px'}}>Soumettre la demande</button>
                </form>
            </div>
        </div>
    );
}