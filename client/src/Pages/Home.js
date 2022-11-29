import { useState, useEffect } from "react";
import Logo from './imgs/logo.png'
import Banner1 from './imgs/teste2.png'
import Banner2 from './imgs/banner2.jpg'
import Banner3 from './imgs/banner3.jpg'
import Banner4 from './imgs/banner4.jpg'
import imgCachorro from './imgs/imgCachorro.png'
import imgGato from './imgs/imgGato.png'
import imgPeixe from './imgs/imgPeixe.png'
import imgTodos from './imgs/imgTodos.png'
import carrinho from './imgs/carrinho-compra.png'
import Calendar from 'react-calendar';
import '../styles/home.css'
import api from '../api.js'
import Header from "../Components/Header";
import { useNavigate, useLocation, Link } from "react-router-dom";
import FooterPetShop from "../Components/Footer";


function Home() {
 
  const sobreMais = document.querySelector('div.content-sobre-home-mais');
  function clickSobre() {
    var verMais = sobreMais.classList.contains('content-sobre-home-menos');
    sobreMais.classList.toggle('content-sobre-home-menos');
    this.innerHTML = verMais ? 'Ler mais' : 'Ler menos';
};
const navigate = useNavigate();
const SearchItemCachorro = () => {
  navigate('/itens?search=Cachorro')
}

const SearchItemGato = () => {
  navigate('/itens?search=Gato')
}

const SearchItemPeixe = () => {
  navigate('/itens?search=Peixe')
}

const SearchItems = () => {
  navigate('/itens')
}

  const [parametros, setParametros] = useState([])

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const search = query.get('search');

  useEffect(() => {
      api.get('/itens').then(res => {
          let parametros = (res.data[0].itens)

          if (search == null || search == ""){
              setParametros(parametros)
          }
          else {
              let filter = parametros.filter(
                  i => i.nomeItem.toLowerCase().includes(search.toLowerCase())
              )
              setParametros(filter)
          }
      })
  }, [])




  return (
    <div classname="base-projeto">
      <Header />

      <div class="full-content">
    <div class="content-slider">
      <div class="slider-img">
          {/* <!--Botões de troca--> */}
          <input class="input-slider" type="radio" name="radio" id="slide-1"/>
          <input class="input-slider" type="radio" name="radio" id="slide-2"/>
          <input class="input-slider" type="radio" name="radio" id="slide-3"/>
          <input class="input-slider" type="radio" name="radio" id="slide-4"/>

          {/* <!--imagens a serem trocadas--> */}
          <div class="slide-img s1">
              <img src={Banner3} alt="img1"/>
          </div>
          <div class="slide-img s2">
              <img src={Banner4} alt="img2"/>
          </div>
          <div class="slide-img s3">
              <img src={Banner2} alt="img3"/>
          </div>
          <div class="slide-img s4">
              <img src={Banner1} alt="img4"/>
          </div>

          {/* <!--botões de navegação--> */}
          <div class="navigator-slide">
              <label class="lbl-slide" for="slide-1"></label>
              <label class="lbl-slide" for="slide-2"></label>
              <label class="lbl-slide" for="slide-3"></label>
              <label class="lbl-slide" for="slide-4"></label>
          </div>
      </div>
      
      
  </div>
  <div class="content-inicio">
        <ul>

          <li class="li-inicio li-1">
            <div>
              <h2>Resgate na loja</h2>
              <a href=""><p>Ver Regras</p></a>
            </div>
          </li>

          <li class="li-inicio li-2">
            <div>
              <h2>Frete Gratis</h2>
              <a href=""><p>Ver Regras</p></a>
            </div>
          </li>

          <li class="li-inicio li-3">
            <div>
              <h2>Qualidade dos produtos</h2>
              <a href=""><p>Ver Regras</p></a>
            </div>
          </li>

          <li class="li-inicio li-4">
            <div>
              <h2><b>Descontos</b></h2>
              <a href=""><p>Ver Regras</p></a>
            </div>
          </li>

        </ul>
    </div>
    <hr/>
    <div class="content-produtos">
      <h1>Produtos</h1>
      <div className="items-grid-container">
                    <div className="items-grid-home">
                        {
                            parametros.map((item, i = 3) => (
                                <div key={i} className="items-item-container">
                                    <a href={"item?id=" + item.idItem} style={{ textDecoration: 'none' }}>
                                        <div className="item-img-container">
                                            <div className="item-img-container-inner">
                                                <img className="item-img" src={item.imgUrl}></img>
                                            </div>
                                        </div>

                                        <div className="item-info-container">
                                            <div className="item-name-container">
                                                <p className="item-name" >{item.nomeItem}</p>
                                            </div>

                                            <div className="item-price-container">
                                                <p className="item-price">R${item.precoItem}</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))
                        }

                    </div>

    </div>
</div>
<hr/>
        <h1>Categorias</h1> 
        <div class="content-filtros">
          <a href="" onClick={SearchItemCachorro}>
            <div class="filtros-div">
              <img src={imgCachorro}/>
              <h3>Cachorro</h3>
            </div>
          </a>
          <a href="" onClick={SearchItemGato}>
            <div class="filtros-div">
              <img src={imgGato}/>
              <h3>Gato</h3>
            </div>
          </a>
          <a href="" onClick={SearchItemPeixe}>
            <div class="filtros-div">
              <img src={imgPeixe}/>
              <h3>Peixes</h3>
            </div>
          </a>
          <a href="" onClick={SearchItems}>
           <div class="filtros-div">
              <img src={imgTodos}/>
              <h3>Todos</h3>
            </div>
          </a>
        </div>

        <hr/>

        <div class="content-sobre-home-mais">
          <h1 class="hSobre">PetShop</h1>
          <p class="pSobre">Pet shop ou loja de animais é um estabelecimento comercial especializado em vender animais, geralmente filhotes, destinados a serem animais de estimação, bem como alimentos, acessórios e artigos para entusiastas, além de oferecer serviços de embelezamento como banho, tosa e perfumaria.Os principais animais comercializados nesses estabelecimentos são cães, gatos, pássaros e peixes ornamentais. Porém, muitas lojas também trabalham com espécimes exóticos como chinchilas, esquilos, furões, lagartos, cobras e tartarugas.</p>
          <h2 class="hSobre">Animal de Estimação</h2>
          <p class="pSobre">Um animal de estimação ,ou mascote, é um animal doméstico selecionado para o convívio com os seres humanos por questões de companheirismo ou divertimento, o que não significa que essa seja a única função dessas espécies na nossa sociedade.</p>
          <h2 class="hSobre">Funções sociais</h2>
          <p class="pSobre">Animais de estimação apresentam diversas funções na sociedade humana, sendo frequentemente citados como formas de se trazer conforto, companhia e aumentar a autoestima das pessoas. A psicologia reconhece que os efeitos benéficos do convívio com animais de estimação são diversos, tanto para adultos bem como para crianças com destaque à redução do stress, combate à crises de depressão e aumento do senso de responsabilidade.</p>
          <p class="pSobre">Estudos envolvendo pessoas que mantém gatos como companhia indicam que existe correlação direta entre a presença desses animais e a melhoria da saúde de seus mantenedores humanos. Observou-se uma redução de 30% no risco de ocorrências de infartos nas pessoas que têm gatos como animais de estimação. O provável motivo é que o convívio com esses pequenos felinos seria capaz de minimizar os níveis de estresse, um dos principais responsáveis pelo surgimento de problemas cardiovasculares.</p>
        </div>
        <hr class="hr-no-margin"/>
        <button id="sobre-button" onClick={clickSobre} type="button"><b>Ler mais</b></button>


        </div>
    <FooterPetShop />
</div>
  );
}

export default Home;