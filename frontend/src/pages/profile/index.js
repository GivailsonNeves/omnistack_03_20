import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const ongID = localStorage.getItem('ong_id');
    const ongName = localStorage.getItem('ong_name');

    useEffect(() => {
        api.get('/profile', { headers: { Authorization: ongID } })
            .then(
                res => setIncidents(res.data)
            )
    }, [ongID]);

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    async function handleDelete(incidentID) {
        await api.delete(`/incidents/${incidentID}`);
        setIncidents(incidents.filter( i => i.id !== incidentID ));
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new" >
                    Cadastrar novo caso
                </Link>
                <button 
                    onClick={handleLogout}
                    type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident =>
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{new Intl.NumberFormat([], { style: 'currency', currency:'BRL'}).format(incident.value)}</p>
                        <button 
                            onClick={() => handleDelete(incident.id)}
                            type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}