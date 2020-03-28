import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response  = await api.post('ongs', data);
            alert(`Seu id é ${(response).data.id}`);
            history.push('/');
        } catch(error) {
            alert('Erro ao registrar ong!');
        }

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"/>
                    <h1>Cadastro</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates inventore quas ab harum ipsam necessitatibus iste excepturi. Temporibus id repudiandae, quod vitae ullam, aut sed placeat voluptatibus incidunt autem provident.</p>
                    <Link className="link-button" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Já tenho login
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nome da ONG" />
                    <input 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="E-mail" type="email" />
                    <input 
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        placeholder="Whatsapp" />

                    <div className="input-group">
                        <input 
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="Cidade" />
                        <input 
                            value={uf}
                            onChange={e => setUF(e.target.value)}
                            placeholder="UF" style={{width: 80}} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}