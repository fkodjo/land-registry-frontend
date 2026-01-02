import React, { useState } from 'react';
import api from '../utils/api';

export default function Depot() {
    // Tous les champs requis par votre modèle Land.js
    const [form, setForm] = useState({ 
        uniqueIdentity: '', 
        surfaceArea: '', 
        locAddress: '', 
        geolocalization: '', 
        description: '' 
    });
    const [file, setFile] = useState(null);

    // 1. NOUVEL ÉTAT : Pour gérer l'affichage du Modal
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification avant envoi
        if (!file) {
            alert("⚠️ Attention : Vous devez sélectionner une image pour le plan !");
            return;
        }

        // 2. DÉBUT DU CHARGEMENT : On affiche le modal
        setIsSubmitting(true);

        // Création du FormData
        const data = new FormData();
        data.append('planFile', file);
        data.append('uniqueIdentity', form.uniqueIdentity);
        data.append('surfaceArea', form.surfaceArea);
        data.append('locAddress', form.locAddress);
        data.append('geolocalization', form.geolocalization);
        data.append('description', form.description);

        try {
            await api.post('/lands/request', data, {
                headers: {
                    "Content-Type": "multipart/form-data" 
                }
            });

            // Succès
            // Note : On ne ferme pas forcément le modal ici car on redirige tout de suite
            alert("✅ Demande soumise avec succès !");
            window.location.href = "/dashboard";

        } catch (error) {
            console.error("ERREUR COMPLÈTE :", error);

            if (error.response) {
                const msg = error.response.data.error || error.response.data.message || "Erreur inconnue";
                const details = error.response.data.details ? JSON.stringify(error.response.data.details, null, 2) : "";
                alert(`❌ Erreur Backend (${error.response.status}) :\n${msg}\n\n${details}`);
            } else if (error.request) {
                alert("❌ Erreur Réseau : Le serveur ne répond pas.");
            } else {
                alert("❌ Erreur Client : " + error.message);
            }
            
            // En cas d'erreur, on doit fermer le modal pour laisser l'utilisateur réessayer
            setIsSubmitting(false);
        }
        // Pas de 'finally' avec setIsSubmitting(false) ici, car si ça réussit, 
        // on quitte la page vers /dashboard, donc inutile de changer l'état.
    };

    return (
        <div className="main-content">
            <div style={{maxWidth: '600px', margin: '0 auto'}}>
                <h2 style={{color: '#6c757d', marginBottom: '30px', textAlign:'center'}}>Demande d'authentification foncière</h2>
                
                <form className="depot-form" onSubmit={handleSubmit}>
                    
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
                    
                    {/* Désactive le bouton si c'est en cours d'envoi */}
                    <button 
                        type="submit" 
                        className="btn-action" 
                        disabled={isSubmitting}
                        style={{
                            width:'100%', 
                            marginTop:'20px', 
                            opacity: isSubmitting ? 0.6 : 1, 
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSubmitting ? "Envoi en cours..." : "Soumettre la demande"}
                    </button>
                </form>
            </div>

            {/* 3. LE MODAL (S'affiche uniquement si isSubmitting est true) */}
            {isSubmitting && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        {/* Spinner CSS */}
                        <div style={modalStyles.spinner}></div>
                        <h3 style={{ marginTop: '20px', color: '#333' }}>Traitement en cours</h3>
                        <p style={{ color: '#666' }}>Veuillez patienter pendant l'envoi des documents...</p>
                    </div>
                </div>
            )}
            
            {/* Ajout de l'animation CSS pour le spinner */}
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
}

// --- Styles pour le Modal (tu peux déplacer ça dans ton fichier CSS) ---
const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fond sombre
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Très haut pour passer au dessus de tout
    },
    modal: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        minWidth: '300px',
        maxWidth: '80%',
    },
    spinner: {
        margin: '0 auto',
        width: '50px',
        height: '50px',
        border: '6px solid #f3f3f3',
        borderTop: '6px solid #3498db', // Bleu
        borderRadius: '50%',
        animation: 'spin 1s linear infinite', // Appelle le @keyframes défini plus haut
    }
};