import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncidents() {

    const history  = useHistory();
    
    const ong_id = localStorage.getItem('ong_id');
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');


    async function handleRegister(e) {
        e.preventDefault();
        const incident = await api.post('incidents',{
            title,
            description,
            value
        }, { headers: { Authorization: ong_id }});

        if (incident) {
            history.push('/profile');
        } else {
            alert('erro ao cadastrar novo registro');
        }
    }

    return (
        <div className="newincidents-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates inventore quas ab harum ipsam necessitatibus iste excepturi. Temporibus id repudiandae, quod vitae ullam, aut sed placeat voluptatibus incidunt autem provident.</p>
                    <Link className="link-button" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        placeholder="Título do caso" />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição"/>
                    <input 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em reais" />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}