import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Dashboard() {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [receiver, setReceiver] = useState('');

  // États des modales
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [txDetails, setTxDetails] = useState({ hash: '', to: '' });

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = () => {
    api.get('/lands/user/me')
      .then(res => setLands(res.data.lands))
      .catch(console.error);
  };

  const openTransfer = (land) => {
    setSelectedLand(land);
    setShowTransferModal(true);
    setReceiver('');
  };

  const handleTransfer = async () => {
    if (!receiver) return;

    try {
      // LOGIQUE DE TRANSFERT
      // Si vous avez la route backend, décommentez ceci :
      // const res = await api.post('/lands/approve', { tokenId: selectedLand.tokenId }); // Ou route transfert spécifique

      // Pour correspondre au design, on simule l'affichage des modales :
      if (receiver === 'error') throw new Error("Simulation Fail");

      setTxDetails({
        hash: "0xSIMULATED_TRANSACTION_HASH...",
        to: receiver
      });

      setShowTransferModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setShowTransferModal(false);
      setShowErrorModal(true);
    }
  };

  const closeAll = () => {
    setShowTransferModal(false);
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  return (
    <div className="main-content" style={{ textAlign: 'left' }}>
      {lands.length === 0 && <p style={{ textAlign: 'center', marginTop: 40 }}>Aucun titre foncier trouvé.</p>}

      {lands.map(land => (
        <div key={land._id} className="land-card">
          <img src={land.planPicture || "https://via.placeholder.com/300"} alt="Plan" className="land-img" />
          <div className="land-info">
            <p><strong>Identifiant :</strong> {land.uniqueIdentity}</p>
            <p><strong>Adresse/Quartier :</strong> {land.locAddress}</p>
            <p><strong>Superficie :</strong> {land.surfaceArea} m²</p>
            <p><strong>Localisation :</strong> {land.geolocalization}</p>
            {/* On affiche le wallet car on n'a pas le nom en base */}
            <p><strong>Propriétaire :</strong> {land.ownerIdentity}</p>
            <p><strong>Description :</strong> {land.description}</p>

            <button className="btn-action" style={{ marginTop: '20px', width: 'auto' }} onClick={() => openTransfer(land)}>
              Effectuer un transfert
            </button>
          </div>
        </div>
      ))}

      {/* MODALE TRANSFERT */}
      {showTransferModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeAll}>&times;</button>
            <div style={{ height: '150px', background: '#eee', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
              {selectedLand?.planPicture && <img src={selectedLand.planPicture} style={{ maxHeight: '100%' }} alt="" />}
            </div>
            <p style={{ textAlign: 'left' }}><strong>ID:</strong> {selectedLand?.uniqueIdentity}</p>
            <input
              type="text"
              className="form-control"
              style={{ marginTop: '10px', marginBottom: '20px' }}
              placeholder="Entrer l'adresse portefeuille du récepteur"
              value={receiver}
              onChange={e => setReceiver(e.target.value)}
            />
            <button className="btn-action" style={{ width: '100%' }} onClick={handleTransfer}>Valider le transfert</button>
          </div>
        </div>
      )}

      {/* MODALE SUCCÈS */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeAll}>&times;</button>
            <h2 className="status-success">Opération réussie</h2>
            <div style={{ textAlign: 'left', wordBreak: 'break-all', fontSize: '13px', color: '#555', marginBottom: '20px' }}>
              <p><strong>Hash:</strong> {txDetails.hash}</p>
              <p><strong>To:</strong> {txDetails.to}</p>
            </div>
            <button className="btn-action" style={{ width: '100%' }} onClick={closeAll}>Fermer</button>
          </div>
        </div>
      )}

      {/* MODALE ECHEC */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeAll}>&times;</button>
            <h2 className="status-error" style={{ margin: '40px 0' }}>Echec de l'opération</h2>
          </div>
        </div>
      )}
    </div>
  );
}