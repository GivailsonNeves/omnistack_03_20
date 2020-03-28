import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';

export default function Logon() {

    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        const user = await api.get(`/login/${id}`);

        console.log(user)
        if (user !== null) {
            localStorage.setItem('ong_id', id);
            localStorage.setItem('ong_name', user.data.name);
            history.push('/profile');
        } else {
            alert('usuário não encontrado!')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        value={id}
                        onChange={e => setID(e.target.value)} 
                        type="text" 
                        placeholder="Sua ID"/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="link-button" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={herosImg} alt="Heros" />
        </div>
    );
}