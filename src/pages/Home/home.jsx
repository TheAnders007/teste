import * as React from "react";
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet-async';
import '../../style/header.css'
import '../../style/footer.css'
import '../../style/Home/depoimento.css';

import Header from '../../components/header.js';
import Depoimentos from '../../components/index/depoimentos.jsx';
import AutoScroll from '../../components/index/AutoScrollCarrossel.jsx';
import Carrossel from '../../components/index/carrossel.jsx';
import Titulo from '../../components/index/titulo.jsx';
import Guia from '../../components/index/guia.jsx';
import Footer from '../../components/footer.js'

export default () => {
    const compartilhamento = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Festivais Brasileiros',
                text: 'Explore os maiores festivais do Brasil! Descubra música, cultura, cuidados e tradições em eventos inesquecíveis.',
                url: 'http://localhost:3000/#',  
            })
            .then(() => console.log('Compartilhamento realizado com sucesso!'))
            .catch((error) => console.error('Erro ao compartilhar:', error));
        } else {
            alert('O compartilhamento não é suportado neste dispositivo ou navegador.');
        }
    };
    

    return(
    <>
        <HelmetProvider>
            <div className="App">
                <Helmet>
                    <title>Festivale</title>
                </Helmet>
                <Header />
                <section>
                    <div className="banner">
                        <div className="conteudo">
                            <h1>festivais</h1>
                            <h1>brasileiros</h1>
                            <p>
                                Explore os maiores festivais do Brasil! De Carnaval a Parintins,
                                descubra música, cultura e tradições em eventos inesquecíveis.
                            </p>
                        </div>
                    </div> {/* banner */}

                    <div className="divisao">
                        <div className="barra"></div>
                        <a target="_blank" href="https://github.com/Cam1ss/PP-III">
                            <i className="bi bi-github"></i>
                        </a>
                        <a onClick={compartilhamento}>
                            <i className="bi bi-share"></i>
                        </a>

                    </div> {/* divisao */}

                    <Carrossel />
                    <Titulo nome="guia">
                        <Guia />
                    </Titulo>
                </section>
                <AutoScroll />
                <section>
                    <Titulo nome="depoimentos">
                        <Depoimentos />
                        <a className="btn-verMais">ver mais</a>
                    </Titulo>
                </section>
                <Footer />
            </div>
        </HelmetProvider>
    </>
    )

};